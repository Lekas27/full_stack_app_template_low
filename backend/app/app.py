from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.health import router as health_router
from app.routes import api_router
from app.utils.exceptions import (
    ConflictException,
    ExternalServiceException,
    NotFoundException,
    RateLimitException,
    UnauthorizedException,
    ValidationException,
)

logger = logging.getLogger(__name__)


def add_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(NotFoundException)
    def not_found_exception_handler(_request: Request, exc: NotFoundException) -> JSONResponse:
        return JSONResponse(
            status_code=404,
            content={
                "error": exc.error_code,
                "message": exc.message,
                "entity": exc.entity,
                "entity_id": exc.entity_id,
            },
        )

    @app.exception_handler(ValidationException)
    def validation_exception_handler(_request: Request, exc: ValidationException) -> JSONResponse:
        return JSONResponse(
            status_code=400,
            content={
                "error": exc.error_code,
                "message": exc.message,
                "field": exc.field,
            },
        )

    @app.exception_handler(UnauthorizedException)
    def unauthorized_exception_handler(
        _request: Request, exc: UnauthorizedException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=401,
            content={"error": exc.error_code, "message": exc.message},
        )

    @app.exception_handler(RateLimitException)
    def rate_limit_exception_handler(_request: Request, exc: RateLimitException) -> JSONResponse:
        return JSONResponse(
            status_code=429,
            content={
                "error": exc.error_code,
                "message": exc.message,
                "retryAfter": exc.retry_after,
            },
            headers={"Retry-After": str(exc.retry_after)},
        )

    @app.exception_handler(ExternalServiceException)
    def external_service_exception_handler(
        _request: Request, exc: ExternalServiceException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=502,
            content={
                "error": exc.error_code,
                "message": exc.message,
                "service": exc.service,
            },
        )

    @app.exception_handler(ConflictException)
    def conflict_exception_handler(_request: Request, exc: ConflictException) -> JSONResponse:
        return JSONResponse(
            status_code=409,
            content={"error": exc.error_code, "message": exc.message},
        )


def setup_middleware(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    yield


def setup_app() -> FastAPI:
    app = FastAPI(
        title="FastAPI Template",
        version="0.1.0",
        lifespan=lifespan,
    )

    app.include_router(api_router)
    app.include_router(health_router)

    add_exception_handlers(app)
    setup_middleware(app)

    return app
