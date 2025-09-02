from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(tags=["teachers"])

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


@router.put("/students/{student_id}", response_model=schemas.Student)
def update_student(
    student_id: int,
    student_update: schemas.StudentUpdate,
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    user = db.query(models.User).filter(models.User.id == student.user_id).first()

    if student_update.email and student_update.email != user.email:
        if db.query(models.User).filter(models.User.email == student_update.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        user.email = student_update.email

    if student_update.name is not None:
        user.name = student_update.name

    if student_update.is_active is not None:
        user.is_active = student_update.is_active

    if student_update.grade_level is not None:
        student.grade_level = student_update.grade_level

    if student_update.department is not None:
        student.department = student_update.department

    db.commit()
    db.refresh(student)
    return student


@router.get("/grades", response_model=List[schemas.Grade])
def get_grades(
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    return db.query(models.Grade).all()


@router.post("/grades", response_model=schemas.Grade, status_code=201)
def add_grade(
    grade: schemas.GradeCreate,
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    student = (
        db.query(models.Student)
        .filter(models.Student.id == grade.student_id)
        .first()
    )
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    new_grade = models.Grade(
        student_id=grade.student_id,
        subject=grade.subject,
        grade=grade.grade,
        assignment_type=grade.assignment_type,
    )
    db.add(new_grade)
    db.commit()
    db.refresh(new_grade)
    return new_grade
