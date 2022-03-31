import json
import pathlib

from geojson_pydantic import Feature, Polygon

from tests.utils.helpers import create_forest

# convert the test_forest json object to python dict
test_forest = json.loads(pathlib.Path("tests/utils/test_forest.json").read_text())


def test_read_forests(test_app_with_db):

    # create forest
    forest_id = create_forest(feature=test_forest)

    # query forests
    response = test_app_with_db.get("/forests/")

    assert response.status_code == 200

    forests = response.json()

    # test that only one forest with the uploaded id exists
    assert (
        len(list(filter(lambda forest: forest["id"] == forest_id, forests["items"])))
        == 1
    )

    assert forests["total"]
    assert type(forests["total"]) == int

    assert forests["page"]
    assert type(forests["page"]) == int

    assert forests["size"]
    assert type(forests["size"]) == int


def test_read_forest_with_forest_type_filter(test_app_with_db):

    # set filter type
    filter_type = "Reforestation"

    # create forest with the type attribute set to the type we want to filter
    create_forest(feature=test_forest, feature_property_override={"type": filter_type})

    # query forests with forest_type param
    forests = test_app_with_db.get(f"/forests/?forest_type={filter_type}")
    assert forests.status_code == 200

    response = forests.json()

    # test that we do not get an item back in the response
    # considering it should be filtered
    assert not list(
        filter(lambda forest: forest["type"] == filter_type, response["items"])
    )


def test_read_forest(test_app_with_db):

    # create forest
    forest_id = create_forest(feature=test_forest)

    # query forests
    forests = test_app_with_db.get(f"/forests/{forest_id}/")
    assert forests.status_code == 200

    response = forests.json()

    # create a geojson pydantic model to perform assertions on
    forest_feature = Feature(**response)

    # test the geojson type is a feature and that the geom is a polygon
    assert forest_feature.type == "Feature"
    assert type(forest_feature.geometry) == Polygon

    # test that the geojson properties uploaded match the ones
    # returned from the db / api
    for upload_key, upload_val in test_forest["properties"].items():
        assert response["properties"][upload_key] == upload_val


def test_read_forest_doesnt_exist(test_app_with_db):

    # create forest
    create_forest(feature=test_forest)

    incorrect_forest_id = "999999"

    # get forest that does not exist
    response = test_app_with_db.get(f"/forests/{incorrect_forest_id}/")

    assert response.status_code == 404

    assert response.json() == {
        "detail": f"Forest record '{incorrect_forest_id}' not found"
    }
