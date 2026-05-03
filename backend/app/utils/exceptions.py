from __future__ import annotations


class CustomException(Exception):
    """Base exception for all Estitor errors"""

    def __init__(self, message: str, error_code: str | None = None):
        self.message = message
        self.error_code = error_code
        super().__init__(self.message)


class NotFoundException(CustomException):
    """Entity not found exception"""

    def __init__(self, entity: str, entity_id: int | str):
        super().__init__(message=f"{entity} with ID {entity_id} not found", error_code="NOT_FOUND")
        self.entity = entity
        self.entity_id = entity_id


class ValidationException(CustomException):
    """Validation error exception"""

    def __init__(self, message: str, field: str | None = None):
        super().__init__(message=message, error_code="VALIDATION_ERROR")
        self.field = field


class UnauthorizedException(CustomException):
    """User not authenticated"""

    def __init__(self, message: str = "Authentication required"):
        super().__init__(message=message, error_code="UNAUTHORIZED")


class ForbiddenException(CustomException):
    """User not authorized for this action"""

    def __init__(self, message: str = "Insufficient permissions"):
        super().__init__(message=message, error_code="FORBIDDEN")


class DatabaseException(CustomException):
    """Database operation error"""

    def __init__(self, message: str, original_error: Exception | None = None):
        super().__init__(message=message, error_code="DATABASE_ERROR")
        self.original_error = original_error


class CacheException(CustomException):
    """Cache operation error"""

    def __init__(self, message: str):
        super().__init__(message=message, error_code="CACHE_ERROR")


class ExternalServiceException(CustomException):
    """External service error (S3, Stripe, etc.)"""

    def __init__(self, service: str, message: str):
        super().__init__(message=f"{service} error: {message}", error_code="EXTERNAL_SERVICE_ERROR")
        self.service = service


class ConflictException(CustomException):
    """Resource conflict (e.g., duplicate entry)"""

    def __init__(self, message: str):
        super().__init__(message=message, error_code="CONFLICT")


class RateLimitException(CustomException):
    """Rate limit exceeded"""

    def __init__(self, message: str = "Rate limit exceeded", retry_after: int = 60):
        super().__init__(message=message, error_code="RATE_LIMIT_EXCEEDED")
        self.retry_after = retry_after


class FreeAdsLimitReachedException(CustomException):
    """User has reached the maximum number of free ads."""

    def __init__(self) -> None:
        super().__init__(
            message="You have reached the maximum number of free ads",
            error_code="ALREADY_AT_FULL_NUMBER_OF_FREE_ADS",
        )
