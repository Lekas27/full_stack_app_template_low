from __future__ import annotations

from collections.abc import Callable
from typing import Any, TypeVar

from kink import di
from kink import inject as kink_inject

T = TypeVar("T")


def add_to_di_container[T](key: type[T], value: T) -> None:
    di[key] = value


def get_from_di_container[T](key: type[T]) -> T:
    return di[key]


def inject(alias: Any | None = None, singleton: bool = False) -> Any:
    return kink_inject(alias=alias, use_factory=not singleton)


def remove_from_di_container(key: type[Any]) -> None:
    del di._services[key]


class LazyInjector[T]:
    def __init__(self, service_ref: type[T]):
        self._service_ref = service_ref
        self._resolved: T | None = None

    def __getattr__(self, name: str) -> Any:
        if self._resolved is None:
            self._resolved = get_from_di_container(self._service_ref)
        return getattr(self._resolved, name)


def get_from_di_container_lazy[T](service_ref: type[T]) -> T:
    """Create a lazy proxy for a dependency"""
    # NOTE: `__getattr__` of LazyInjector is fixing this issue
    return LazyInjector(service_ref)  # type: ignore[return-value]
# def inject(
#     *,
#     alias: type[T] | None = None,
#     singleton: bool = False,
# ) -> Callable[[type[T]], type[T]]:
#     """
#     Enhanced wrapper for kink.inject decorator with automatic alias registration.

#     This decorator automatically registers the class with Kink's DI container
#     and optionally maps an interface type to the implementation.

#     Args:
#         alias: Optional interface type to automatically register this implementation for.
#                When provided, the decorator will register: alias -> implementation mapping.
#         singleton: If True, creates a single instance (default: False).
#                    Note: kink 0.6.x doesn't support singleton parameter directly,
#                    so we ignore it for now (all services are singletons by default in kink).

#     Example:
#         @inject(alias=IUserService, singleton=False)
#         class UserService:
#             def __init__(self, repository: IUserRepository):
#                 self._repository = repository

#         # Now IUserService is automatically mapped to UserService
#         # No need to manually add: di[IUserService] = lambda _: di[UserService]
#     """
#     from kink import inject as kink_inject

#     def decorator(cls: type[T]) -> type[T]:
#         # Register the class with Kink
#         kink_inject(cls)

#         # Automatically register interface -> implementation mapping
#         if alias:
#             add_to_di_container(alias, lambda _: get_from_di_container(cls))

#         return cls

#     return decorator

# def add_to_di_container(
#     key: type[T],
#     value: T | Callable[[], T],
# ) -> None:
#     """
#     Explicitly add an item to the DI container.

#     This function provides a clean abstraction over Kink's DI container,
#     making it easier to switch DI frameworks in the future if needed.

#     Args:
#         key: The type to use as the container key
#         value: The instance or factory function to store
#         singleton: Whether to cache the instance (currently ignored in Kink 0.6.x)

#     Example:
#         # Register an instance
#         settings = Settings()
#         add_to_di_container(Settings, settings)

#         # Register with interface
#         session_factory = SessionFactory(settings)
#         add_to_di_container(ISessionFactory, session_factory, singleton=True)
#     """
#     di[key] = value

# def get_from_di_container(key: type[T]) -> T:
#     """
#     Explicitly retrieve an item from the DI container.

#     This function provides a clean abstraction over Kink's DI container,
#     making it easier to add logging, validation, or switch frameworks.

#     Args:
#         key: The type to retrieve

#     Returns:
#         The resolved instance

#     Example:
#         settings = get_from_di_container(Settings)
#         service = get_from_di_container(IUserService)
#     """
#     return di[key]


def get_di_entity[T](entity: type[T]) -> Callable[[], T]:
    """
    Get entity from DI container.
    Use this for FastAPI Depends() injections.

    Args:
        entity: Type of entity to retrieve

    Returns:
        Callable that returns instance of the requested type

    Example:
        @router.get("/users/{user_id}")
        def get_user(
            user_id: int,
            service: Annotated[IUserService, Depends(get_di_entity(IUserService))]
        ):
            return service.get_by_id(user_id)
    """
    return lambda: get_from_di_container(entity)


def reset_di_container() -> None:
    """
    Reset DI container (useful for testing).

    Example:
        def test_something():
            reset_di_container()
            # Setup test dependencies
            di[IUserService] = MockUserService()
    """
    # In kink 0.6.x, we need to clear the internal dicts manually
    di._services.clear()
    di._factories.clear()
    di._aliases.clear()
    di._memoized_services.clear()
