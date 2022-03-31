from typing import Optional

from fastapi import APIRouter, Depends, Path
from fastapi_pagination import Page, Params, paginate
from sqlalchemy.orm import Session

from api.db import get_db
from api.forests import crud
from api.models import schemas

# REST API Router methods for the /forests path

router = APIRouter()


@router.get(
    "/",
    summary="Read all forest records GET",
    response_description="Paginated forest records",
    response_model=Page[schemas.ForestResponseSchema],
)
def read_forests(
    search_query: Optional[str] = None,
    forest_type: Optional[str] = None,
    params: Params = Depends(),
    db_connection: Session = Depends(get_db),
) -> Page[schemas.ForestResponseSchema]:
    return paginate(
        crud.get_all_forests(search_query, forest_type, db_connection), params
    )


@router.get(
    "/{id}",
    summary="Read forest record by id GET",
    response_description="A forest record",
    response_model=Optional[schemas.ForestDetailResponseSchema],
)
def read_forest(id: int = Path(..., gt=0), db_connection: Session = Depends(get_db)):
    return crud.get_forest(db_connection, id)
