import sqlalchemy.dialects.postgresql as pg
from geoalchemy2 import Geometry
from sqlalchemy import Column
from sqlalchemy.ext.declarative import declarative_base

from api.models.enums import ForestType, ThreeTierRanking

# set up the base for the models
Base = declarative_base()


# Table schema for a Forest table
# Note: this table is only intended for a database that supports PostGIS
class Forest(Base):
    __tablename__ = "forest"
    id = Column(pg.INTEGER, primary_key=True)
    name = Column(pg.VARCHAR)
    type = Column(ForestType.to_postgres("type"))
    description = Column(pg.VARCHAR)
    country = Column(pg.VARCHAR)
    country_code = Column(pg.VARCHAR)
    image_url = Column(pg.VARCHAR)
    carbon_stored = Column(pg.FLOAT)
    carbon_stored_30_days = Column(pg.FLOAT)
    bear_mortality = Column(ThreeTierRanking.to_postgres("bear_mortality"))
    critical_fire_risk = Column(ThreeTierRanking.to_postgres("critical_fire_risk"))
    stream_flow = Column(ThreeTierRanking.to_postgres("stream_flow"))
    area_sqm = Column(pg.FLOAT)
    geom = Column(Geometry(srid=4326))
