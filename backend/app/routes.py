from __future__ import annotations

from fastapi import APIRouter
from app.auth.routes import router as auth_routes

api_router = APIRouter(prefix="/api")
api_router.include_router(auth_routes)  # Include the user routes