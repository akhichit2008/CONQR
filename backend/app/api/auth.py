from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, UserResponse
from app.services.auth import get_current_user, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(body: RegisterRequest, request: Request, db: Session = Depends(get_db)) -> User:
    existing_user = db.query(User).filter(User.email == body.email).first()
    if existing_user is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "An account with this email already exists")

    user = User(
        email=body.email,
        company_name=body.company_name,
        hashed_password=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    request.session["user_id"] = user.id
    return user


@router.post("/login", response_model=UserResponse)
def login(body: LoginRequest, request: Request, db: Session = Depends(get_db)) -> User:
    user = db.query(User).filter(User.email == body.email).first()
    if user is None or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")

    request.session["user_id"] = user.id
    return user


@router.post("/logout")
def logout(request: Request) -> dict[str, bool]:
    request.session.clear()
    return {"success": True}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user
