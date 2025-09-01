from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .. import schemas, models, auth
from ..database import get_db

router = APIRouter(tags=["auth"])

@router.post("/register", response_model=schemas.User)
def register_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.get_password_hash(user_data.password)
    db_user = models.User(
        email=user_data.email,
        hashed_password=hashed_password,
        role=user_data.role,
        name=user_data.name,
        is_active=True,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    if user_data.role == "student":
        student = models.Student(
            user_id=db_user.id,
            student_id=f"STD{db_user.id:03d}",
            grade_level="Freshman",
            department="General",
        )
        db.add(student)
    elif user_data.role == "teacher":
        teacher = models.Teacher(
            user_id=db_user.id,
            teacher_id=f"TCH{db_user.id:03d}",
            department="General",
        )
        db.add(teacher)
    db.commit()
    return db_user

@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}
