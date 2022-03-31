import os

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from starlette.testclient import TestClient

from api.config import Settings, get_settings
from api.db import get_db
from api.main import create_application
from api.models.models import Base


# function to return settings config object for use by FastAPI app
def get_settings_override():
    return Settings(testing=1, database_url=os.environ.get("DATABASE_TEST_URL"))


# create test db engine, orm session using test db, and create fores model
test_engine = create_engine(os.environ.get("DATABASE_TEST_URL"))
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
Base.metadata.create_all(bind=test_engine)


# db connection to pass to test FastAPI routes
def get_db_override():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


@pytest.fixture(scope="module")
def test_app_with_db():

    # set up app and override with test settings
    app = create_application()
    app.dependency_overrides[get_settings] = get_settings_override
    app.dependency_overrides[get_db] = get_db_override

    # yield a testclient using our new test app
    with TestClient(app) as test_client:

        yield test_client
