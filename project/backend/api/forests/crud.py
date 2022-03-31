from typing import List, Optional
from urllib.parse import unquote_plus

from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

from api.models import schemas
from api.models.models import Forest


def get_all_forests(
    search_query: Optional[str], forest_type: Optional[str], db_connection: Session
) -> List[schemas.ForestResponseSchema]:

    # query forest table
    query = db_connection.query(
        Forest.id,
        Forest.name,
        Forest.type,
        Forest.description,
        Forest.image_url,
        Forest.country_code,
    )

    if search_query:

        db_connection.execute("SET pg_trgm.similarity_threshold = 0.3")
        fuzzy_search_query = query.filter(
            Forest.name.op("%")(unquote_plus(search_query))
        )

        if fuzzy_search_query.all():

            query = fuzzy_search_query

    if forest_type:
        query = query.filter(Forest.type == forest_type)

    # fetch results from the query and return the list of objects
    return [
        {
            "id": f_id,
            "name": f_name,
            "type": f_type,
            "description": f_description,
            "image_url": f_image_url,
            "country_code": f_country_code,
        }
        for f_id, f_name, f_type, f_description, f_image_url, f_country_code in query.all()
    ]


def get_forest(db_connection: Session, id: int):

    # build a geojson object from the database requesting the forest by id and
    # accessing all features and building a centroid from the
    # polygon to include in the properties.
    query = text(
        """
        SELECT JSONB_BUILD_OBJECT('type',
                                'Feature',
                                'geometry',
                                ST_ASGEOJSON(GEOM)::JSONB,
                                'properties',
                                TO_JSONB(PROPERTIES)) AS FEATURE
        FROM
            (SELECT *, ST_AsGEOJSON(ST_centroid(GEOM))::JSONB as lng_lat
            FROM FOREST
            WHERE ID={id}) PROPERTIES
        """.format(
            **{"id": id}
        )
    )

    record = db_connection.execute(query).scalar()

    if not record:
        raise HTTPException(status_code=404, detail=f"Forest record '{id}' not found")

    return record
