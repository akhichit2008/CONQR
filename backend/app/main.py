import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.api import auth, health, match, proposals
from app.database import Base, SessionLocal, engine
from app.models import ngo, proposal, user  # noqa: F401 - registers the models on Base.metadata
from app.services.seed import seed_ngos

Base.metadata.create_all(bind=engine)

with SessionLocal() as db:
    seed_ngos(db)

app = FastAPI(title="Conqr API")

# The Vite dev server runs on 5173 by default, but auto-bumps to the next
# free port (5174, 5175, ...) if that one's already taken - e.g. by another
# copy of this project running at the same time. allow_origin_regex covers
# any localhost port instead of hardcoding one. allow_credentials is required
# because authentication uses an HTTP-only session cookie, not a header token.
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Signs the session cookie (httponly by default); it never stores more than
# a user id, so nothing sensitive sits in the client-readable cookie payload.
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY", "dev-only-secret-change-me"),
    session_cookie="conqr_session",
    https_only=False,
)

app.include_router(health.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(match.router, prefix="/api")
app.include_router(proposals.router, prefix="/api")
