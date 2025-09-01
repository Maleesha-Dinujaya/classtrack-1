from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

# Router paths are prefixed in `main.py`, so no prefix here to avoid duplication
router = APIRouter(tags=["attendance"])

@router.get("", response_model=List[schemas.Attendance])
def get_attendance(
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    return db.query(models.Attendance).all()

@router.post("", response_model=schemas.Attendance)
def mark_attendance(
    record: schemas.AttendanceBase,
    current_user: models.User = Depends(auth.get_current_active_teacher),
    db: Session = Depends(get_db),
):
    student = db.query(models.Student).filter(models.Student.id == record.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    db_record = models.Attendance(
        student_id=record.student_id,
        teacher_id=current_user.teacher.id,
        date=record.date,
        status=record.status,
        subject=record.subject,
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@router.get("/stats")
def attendance_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_teacher),
):
    total = db.query(models.Attendance).count()
    present = db.query(models.Attendance).filter(models.Attendance.status == "present").count()
    return {"total": total, "present": present}
