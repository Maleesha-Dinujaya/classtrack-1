from fastapi import APIRouter, Depends, HTTPException
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


@router.post("/students", response_model=schemas.Student, status_code=201)
def add_student(
    student: schemas.StudentCreate,
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    if db.query(models.User).filter(models.User.email == student.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.get_password_hash(student.password)
    db_user = models.User(
        email=student.email,
        hashed_password=hashed_password,
        role="student",
        name=student.name,
        is_active=True,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    new_student = models.Student(
        user_id=db_user.id,
        student_id=f"STD{db_user.id:03d}",
        grade_level=student.grade_level or "Freshman",
        department=student.department or "General",
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student
