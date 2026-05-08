from typing import Protocol

from sqlalchemy import insert, select

from app.auth.models.auth_model import User
from app.database.session_factory import ISessionFactory
from app.utils.di import inject


class IAuthRepository(Protocol):
    def find_user_by_email(self, email: str) -> User | None:
        ...

    def create_user(self, email: str, password_hash: str, full_name: str) -> User:
        ...


@inject(alias=IAuthRepository)
class AuthRepository(IAuthRepository):
    def __init__(self, session_factory: ISessionFactory) -> None:
        self._session_factory = session_factory

    def find_user_by_email(self, email: str) -> User | None:
        session = self._session_factory()
        return session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    
    def create_user(self, email: str, password_hash: str, full_name: str) -> User:
        session = self._session_factory()
        return session.execute(
            insert(User).values(email=email, password_hash=password_hash, full_name=full_name).returning(User)
        ).scalar_one()
