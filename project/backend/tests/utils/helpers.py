from scripts.seed_database import forest_from_feature
from tests.conftest import TestingSessionLocal


def create_forest(feature: dict, feature_property_override: dict = None):
    """
    Description:
        helper function to add a forest to the test database.

    Params:
        feature_property_override: dict = key value pair that will
        override existing values in the test forest geojson feature

    Returns:
        forest id: int = the created forest id in the db
    """

    test_connection = TestingSessionLocal()

    if feature_property_override:
        feature.update(feature_property_override)

    forest = forest_from_feature(feature)
    test_connection.add(forest)
    test_connection.commit()

    return forest.id
