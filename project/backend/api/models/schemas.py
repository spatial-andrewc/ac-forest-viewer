from pydantic import BaseModel, Json
from api.models.enums import ForestType, ThreeTierRanking
from typing import List, Dict, Literal


# Pydantic response schemas for use in type casting and validating using FastAPI

class ForestResponseSchema(BaseModel):
    id: int
    name: str
    type: ForestType
    description: str
    image_url: str
    country_code: str  


class ForestDetailProperties(ForestResponseSchema):
    country: str
    carbon_stored: float
    carbon_stored_30_days: float
    bear_mortality: ThreeTierRanking
    critical_fire_risk: ThreeTierRanking
    stream_flow: ThreeTierRanking
    area_sqm: float
    lng_lat: Dict


class ForestDetailResponseSchema(BaseModel):
    type: Literal["Feature"]
    geometry: Dict
    properties: ForestDetailProperties
