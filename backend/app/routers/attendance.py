from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/attendance", tags=["attendance"])

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
