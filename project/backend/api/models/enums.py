from enum import Enum

from sqlalchemy.dialects.postgresql import ENUM

# class for Enum's to inherit from to access helpful function
# that allows the objects to support Postgres enum and default Enum types
class EnumBase(str, Enum):
    @classmethod
    def to_postgres(cls, name):
        values = tuple(map(lambda x: x.value, cls))
        return ENUM(*values, name=name)


class ForestType(EnumBase):
    conservation="Conservation"
    reforestation="Reforestation"


class ThreeTierRanking(EnumBase):
    low="Low"
    medium="Medium"
    high="High"
    not_applicable="N/A"