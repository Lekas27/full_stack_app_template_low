from __future__ import annotations

import functools
import logging
import time
from collections.abc import Callable
from typing import Any, TypeVar

from sqlalchemy.exc import DBAPIError, OperationalError
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

logger = logging.getLogger(__name__)

T = TypeVar("T")


def with_db_retry(
    max_attempts: int = 3,
    min_wait: float = 0.1,
    max_wait: float = 2.0,
) -> Callable[[Callable[..., T]], Callable[..., T]]:
    """
    Decorator for retrying database operations with exponential backoff.

    Retries on transient database errors:
    - Connection timeout
    - Connection reset
    - Lost connection
    - Server has gone away

    Args:
        max_attempts: Maximum number of retry attempts (default: 3)
        min_wait: Minimum wait time between retries in seconds (default: 0.1)
        max_wait: Maximum wait time between retries in seconds (default: 2.0)

    Usage:
        @with_db_retry(max_attempts=3)
        def get_user(user_id: int) -> User:
            session = get_session()
            return session.query(User).filter_by(id=user_id).one()
    """

    def decorator(func: Callable[..., T]) -> Callable[..., T]:
        @retry(
            retry=retry_if_exception_type((OperationalError, DBAPIError)),
            stop=stop_after_attempt(max_attempts),
            wait=wait_exponential(multiplier=1, min=min_wait, max=max_wait),
            reraise=True,
        )
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> T:
            try:
                return func(*args, **kwargs)
            except (OperationalError, DBAPIError) as e:
                logger.warning(
                    f"Database operation failed, will retry: {func.__name__}",
                    exc_info=True,
                    extra={
                        "function": func.__name__,
                        "error": str(e),
                    },
                )
                raise

        return wrapper

    return decorator


def with_cache_fallback(
    cache_key_fn: Callable[..., str] | None = None,
) -> Callable[[Callable[..., T]], Callable[..., T]]:
    """
    Decorator for graceful cache degradation.

    If cache (Redis/Valkey) is unavailable, logs warning and proceeds without cache.
    Prevents cache failures from breaking the application.

    Args:
        cache_key_fn: Optional function to extract cache key from arguments for logging

    Usage:
        @with_cache_fallback()
        def get_ads(filter: SearchFilter) -> list[Ad]:
            # Try cache first, fall back to DB if cache unavailable
            cached = cache.get(key)
            if cached:
                return cached
            # ... fetch from DB ...
    """

    def decorator(func: Callable[..., T]) -> Callable[..., T]:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> T:
            try:
                return func(*args, **kwargs)
            except Exception as e:
                # Check if it's a Redis/Valkey connection error
                error_msg = str(e).lower()
                is_cache_error = any(
                    phrase in error_msg
                    for phrase in [
                        "connection",
                        "redis",
                        "valkey",
                        "timeout",
                        "broken pipe",
                    ]
                )

                if is_cache_error:
                    cache_key = cache_key_fn(*args, **kwargs) if cache_key_fn else "unknown"
                    logger.warning(
                        f"Cache unavailable in {func.__name__}, proceeding without cache",
                        extra={
                            "function": func.__name__,
                            "cache_key": cache_key,
                            "error": str(e),
                        },
                    )
                    # Return None or empty result to signal cache miss
                    # The calling code should handle this gracefully
                    return None  # type: ignore

                # Re-raise non-cache errors
                raise

        return wrapper

    return decorator


class CircuitBreaker:
    """
    Circuit breaker pattern for preventing cascading failures.

    States:
    - CLOSED: Normal operation, requests go through
    - OPEN: Too many failures, requests fail fast
    - HALF_OPEN: Testing if service recovered

    Usage:
        breaker = CircuitBreaker(failure_threshold=5, recovery_timeout=60)

        @breaker.call
        def fetch_external_data():
            # ... make external API call ...
    """

    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: float = 60.0,
        expected_exception: type[Exception] = Exception,
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.expected_exception = expected_exception

        self.failure_count = 0
        self.last_failure_time: float | None = None
        self.state = "CLOSED"

    def call(self, func: Callable[..., T]) -> Callable[..., T]:
        """Decorator to wrap function with circuit breaker"""

        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> T:
            if self.state == "OPEN":
                if self._should_attempt_reset():
                    self.state = "HALF_OPEN"
                else:
                    raise Exception(f"Circuit breaker OPEN for {func.__name__}, failing fast")

            try:
                result = func(*args, **kwargs)
                self._on_success()
                return result
            except self.expected_exception:
                self._on_failure()
                raise

        return wrapper

    def _should_attempt_reset(self) -> bool:
        """Check if enough time has passed to attempt recovery"""
        if self.last_failure_time is None:
            return True
        return time.time() - self.last_failure_time >= self.recovery_timeout

    def _on_success(self) -> None:
        """Reset circuit breaker on successful call"""
        self.failure_count = 0
        self.state = "CLOSED"

    def _on_failure(self) -> None:
        """Increment failure count and open circuit if threshold reached"""
        self.failure_count += 1
        self.last_failure_time = time.time()

        if self.failure_count >= self.failure_threshold:
            self.state = "OPEN"
            logger.error(
                f"Circuit breaker opened after {self.failure_count} failures",
                extra={
                    "failure_count": self.failure_count,
                    "threshold": self.failure_threshold,
                },
            )
