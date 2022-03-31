import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# initiate database
engine = create_engine(os.environ.get("DATABASE_URL"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Yields an instance of sqlalchemy's
# session bound to the active database engine.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
