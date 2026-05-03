from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict

from app.utils.di import add_to_di_container


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "postgresql+psycopg://user:password@localhost:5432/fastapi_db"

    JWT_SECRET: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24

    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20


settings = Settings()
add_to_di_container(Settings, settings)
