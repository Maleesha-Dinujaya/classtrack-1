from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .database import engine, Base, get_db
from . import schemas, models, auth
from .routers import students, teachers, attendance

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.post("/api/auth/register", response_model=schemas.User, status_code=201)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = models.User(
        email=user.email,
        hashed_password=auth.get_password_hash(user.password),
        role=user.role,
        name=user.name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    if user.role == "student":
        db.add(models.Student(user_id=db_user.id, student_id=f"S{db_user.id}"))
    elif user.role == "teacher":
        db.add(models.Teacher(user_id=db_user.id, teacher_id=f"T{db_user.id}"))
    db.commit()
    return db_user

@app.post("/api/auth/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(attendance.router)
