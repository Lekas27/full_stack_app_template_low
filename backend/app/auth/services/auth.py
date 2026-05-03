from datetime import datetime, timedelta, timezone
from typing import Protocol

import bcrypt
import jwt

from app.auth.exceptions.auth import EmailAlreadyExistsException, InvalidCredentialsException
from app.auth.repositories.auth import IAuthRepository
from app.auth.schemas.auth import AuthResponse, UserResponse
from app.config.settings import Settings
from app.utils.di import inject


class IAuthService(Protocol):
    def login(self, email: str, password: str) -> AuthResponse: ...
    def register(self, email: str, password: str, full_name: str) -> AuthResponse: ...


@inject(alias=IAuthService)
class AuthService(IAuthService):
    def __init__(self, auth_repository: IAuthRepository, settings: Settings) -> None:
        self._auth_repository = auth_repository
        self._settings = settings

    def login(self, email: str, password: str) -> AuthResponse:
        user = self._auth_repository.find_user_by_email(email)

        if not user or not self._verify_password(password, user.password_hash):
            raise InvalidCredentialsException()

        token = self._create_access_token(user.id)

        return AuthResponse(
            access_token=token,
            user=UserResponse.model_validate(user),
        )

    def register(self, email: str, password: str, full_name: str) -> AuthResponse:
        if self._auth_repository.find_user_by_email(email):
            raise EmailAlreadyExistsException()

        password_hash = self._hash_password(password)
        user = self._auth_repository.create_user(
            email=email,
            password_hash=password_hash,
            full_name=full_name,
        )

        token = self._create_access_token(user.id)

        return AuthResponse(
            access_token=token,
            user=UserResponse.model_validate(user),
        )

    def _hash_password(self, password: str) -> str:
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def _verify_password(self, password: str, password_hash: str) -> bool:
        return bcrypt.checkpw(password.encode(), password_hash.encode())

    def _create_access_token(self, user_id: int) -> str:
        expire = datetime.now(timezone.utc) + timedelta(minutes=self._settings.JWT_EXPIRE_MINUTES)
        payload = {"sub": str(user_id), "exp": expire}
        return jwt.encode(payload, self._settings.JWT_SECRET, algorithm=self._settings.JWT_ALGORITHM)
