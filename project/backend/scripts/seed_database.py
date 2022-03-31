import json

from shapely.geometry import shape

from api.db import SessionLocal
from api.models.models import Forest


# Function to convert a forest geojson
# feature to a Sqlalchemy Forest table object
def forest_from_feature(feature):

    properties = feature["properties"]
    geom = feature["geometry"]

    forest = Forest(
        name=properties["name"],
        type=properties["type"],
        description=properties["description"],
        country=properties["country"],
        country_code=properties["country_code"],
        image_url=properties["image_url"],
        carbon_stored=properties["carbon_stored"],
        carbon_stored_30_days=properties["carbon_stored_30_days"],
        bear_mortality=properties["bear_mortality"],
        critical_fire_risk=properties["critical_fire_risk"],
        stream_flow=properties["stream_flow"],
        area_sqm=properties["area_sqm"],
        geom=shape(geom).wkt,
    )

    return forest


# Seed dataase's Forest table using Sqlalchemy.
def seed():

    connection = SessionLocal()

    # even though this fn should only be called on startup, this check
    # exists so that we only seed the database with our dataset once.
    if not connection.query(Forest).first():

        # open geojson file
        with open("data/forests.json", "r") as data_file:

            seed_data = json.load(data_file)

            seed_array = []

            for feature in seed_data["features"]:

                seed_array.append(forest_from_feature(feature))

            connection.bulk_save_objects(seed_array)
            connection.commit()


if __name__ == "__main__":
    seed()
