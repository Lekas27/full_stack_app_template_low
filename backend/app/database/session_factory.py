from __future__ import annotations

from typing import Protocol

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, scoped_session, sessionmaker

from app.config.settings import Settings
from app.utils.di import inject


class ISessionFactory(Protocol):
    def __call__(self) -> Session: ...


@inject(alias=ISessionFactory, singleton=True)
class SessionFactory:
    def __init__(self, settings: Settings):
        self._settings = settings
        self._engine = create_engine(
            settings.DATABASE_URL,
            pool_pre_ping=True,
            pool_size=settings.DB_POOL_SIZE,
            max_overflow=settings.DB_MAX_OVERFLOW,
            pool_timeout=30,
            pool_recycle=300,
        )
        session_maker = sessionmaker(
            bind=self._engine,
            autocommit=False,
            autoflush=False,
            expire_on_commit=False,
        )
        self._session_factory = scoped_session(session_maker)

    def __call__(self) -> Session:
        return self._session_factory()

    @property
    def engine(self):
        return self._engine
