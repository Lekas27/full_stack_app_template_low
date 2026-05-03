from typing import Annotated

from fastapi import Depends

from app.auth.schemas.auth import AuthResponse, RegisterRequest
from app.auth.services.auth import IAuthService
from app.database.session_handler import DBAPIRouter
from app.utils.di import get_di_entity


auth_router = DBAPIRouter(prefix="/auth") 

@auth_router.post("/register")
def register(request: RegisterRequest,  service: Annotated[IAuthService, Depends(get_di_entity(IAuthService))]) -> AuthResponse:
    return service.register(
        email=request.email,
        password=request.password,
        full_name=request.full_name,
    )

@auth_router.post("/login")
def login(request: RegisterRequest, service: Annotated[IAuthService, Depends(get_di_entity(IAuthService))]) -> AuthResponse:
    return service.login(
        email=request.email,
        password=request.password,
    )