from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(tags=["students"])

@router.get("/me", response_model=schemas.Student)
def read_students_me(
    current_user: models.User = Depends(auth.get_current_active_student),
    db: Session = Depends(get_db),
):
    return db.query(models.Student).filter(models.Student.user_id == current_user.id).first()

@router.get("/attendance", response_model=List[schemas.Attendance])
def read_attendance(
    current_user: models.User = Depends(auth.get_current_active_student),
    db: Session = Depends(get_db),
):
    student = db.query(models.Student).filter(models.Student.user_id == current_user.id).first()
    return student.attendance if student else []

@router.get("/grades", response_model=List[schemas.Grade])
def read_grades(
    current_user: models.User = Depends(auth.get_current_active_student),
    db: Session = Depends(get_db),
):
    student = db.query(models.Student).filter(models.Student.user_id == current_user.id).first()
    return student.grades if student else []
