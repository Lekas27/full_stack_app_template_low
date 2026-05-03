from __future__ import annotations

import functools
import inspect
from collections.abc import Callable, Sequence
from enum import Enum
from typing import Any

from fastapi import APIRouter, params
from fastapi.dependencies.utils import get_typed_annotation, get_typed_return_annotation
from fastapi.routing import APIRoute
from fastapi.types import DecoratedCallable, IncEx
from fastapi.utils import generate_unique_id
from starlette.responses import JSONResponse, Response
from starlette.routing import BaseRoute

from app.database.session_factory import ISessionFactory
from app.utils.di import get_from_di_container


def db_session_handler[**P, T](func: Callable[P, T]) -> Callable[P, T]:
    """
    Decorator for automatic database session handling with signature preservation.

    Commits on success, rolls back on exception, always closes session.

    IMPORTANT: This decorator preserves the function signature, which is critical
    for FastAPI's dependency injection to work correctly. Without signature
    preservation, FastAPI cannot inspect the function parameters for Depends().

    Usage on route handlers:
        @router.post("/items")
        @db_session_handler
        def create_item(
            item: Item,
            service: Annotated[IItemService, Depends(get_di_entity(IItemService))]
        ):
            return service.create(item)

    Or use DBAPIRouter which applies this automatically to all routes.
    """

    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:

        session = get_from_di_container(ISessionFactory)() # type: ignore[type-abstract]
        try:
            result = func(*args, **kwargs)
            session.commit()
            return result
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    # CRITICAL: Preserve function signature for FastAPI dependency injection
    # Without this, FastAPI cannot inspect parameters like Depends(), Query(), etc.
    globalns = getattr(func, "__globals__", {})
    return_annotation = get_typed_return_annotation(func)
    signature = inspect.signature(func)
    typed_params = [
        inspect.Parameter(
            name=param.name,
            kind=param.kind,
            default=param.default,
            annotation=get_typed_annotation(param.annotation, globalns),
        )
        for param in signature.parameters.values()
    ]
    wrapper.__signature__ = inspect.Signature(  # type: ignore[attr-defined]
        parameters=typed_params,
        return_annotation=return_annotation,
    )

    return wrapper


class DBAPIRouter(APIRouter):
    """
    FastAPI router that automatically wraps all route handlers with db_session_handler.

    This ensures all routes have automatic transaction management:
    - Commits on successful response
    - Rolls back on any exception
    - Always closes the database session

    Usage:
        router = DBAPIRouter()

        @router.post("/items")
        def create_item(
            item: Item,
            service: Annotated[IItemService, Depends(get_di_entity(IItemService))]
        ):
            return service.create(item)

    The above is equivalent to:
        router = APIRouter()

        @router.post("/items")
        @db_session_handler
        def create_item(
            item: Item,
            service: Annotated[IItemService, Depends(get_di_entity(IItemService))]
        ):
            return service.create(item)
    """

    def api_route(
        self,
        path: str,
        *,
        response_model: Any = None,
        status_code: int | None = None,
        tags: list[str | Enum] | None = None,
        dependencies: Sequence[params.Depends] | None = None,
        summary: str | None = None,
        description: str | None = None,
        response_description: str = "Successful Response",
        responses: dict[int | str, dict[str, Any]] | None = None,
        deprecated: bool | None = None,
        methods: list[str] | None = None,
        operation_id: str | None = None,
        response_model_include: IncEx | None = None,
        response_model_exclude: IncEx | None = None,
        response_model_by_alias: bool = True,
        response_model_exclude_unset: bool = False,
        response_model_exclude_defaults: bool = False,
        response_model_exclude_none: bool = False,
        include_in_schema: bool = True,
        response_class: type[Response] = JSONResponse,
        name: str | None = None,
        callbacks: list[BaseRoute] | None = None,
        openapi_extra: dict[str, Any] | None = None,
        generate_unique_id_function: Callable[[APIRoute], str] = generate_unique_id,
    ) -> Callable[[DecoratedCallable], DecoratedCallable]:
        """Override api_route to wrap handlers with db_session_handler."""
        parent_decorator = super().api_route(
            path,
            response_model=response_model,
            status_code=status_code,
            tags=tags,
            dependencies=dependencies,
            summary=summary,
            description=description,
            response_description=response_description,
            responses=responses,
            deprecated=deprecated,
            methods=methods,
            operation_id=operation_id,
            response_model_include=response_model_include,
            response_model_exclude=response_model_exclude,
            response_model_by_alias=response_model_by_alias,
            response_model_exclude_unset=response_model_exclude_unset,
            response_model_exclude_defaults=response_model_exclude_defaults,
            response_model_exclude_none=response_model_exclude_none,
            include_in_schema=include_in_schema,
            response_class=response_class,
            name=name,
            callbacks=callbacks,
            openapi_extra=openapi_extra,
            generate_unique_id_function=generate_unique_id_function,
        )

        def decorator(func: Callable[..., Any]) -> Any:
            return parent_decorator(db_session_handler(func))

        return decorator
