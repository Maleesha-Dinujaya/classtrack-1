from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/teachers", tags=["teachers"])

@router.get("/students", response_model=List[schemas.Student])
def get_students(
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    return db.query(models.Student).all()
