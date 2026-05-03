from __future__ import annotations

import re
from datetime import UTC, datetime
from typing import Any


def validate_phone_number(value: str) -> str:
    """
    Validate phone number format.

    Accepts:
        - +38267123456
        - 067123456
        - 067-123-456
    """
    # Remove common separators
    cleaned = re.sub(r"[\s\-\(\)]", "", value)

    # Check format
    if not re.match(r"^\+?\d{9,15}$", cleaned):
        raise ValueError("Invalid phone number format")

    return cleaned


def validate_url_code(value: str) -> str:
    """
    Validate URL code (slug).

    Must be lowercase, alphanumeric, with hyphens.
    Example: "luxury-apartment-budva-123"
    """
    if not re.match(r"^[a-z0-9\-]+$", value):
        raise ValueError("URL code must be lowercase alphanumeric with hyphens")

    return value


def validate_positive_number(value: float | int) -> float | int:
    """Validate that number is positive"""
    if value <= 0:
        raise ValueError("Value must be positive")
    return value


def validate_price_range(
    min_price: float | None, max_price: float | None,
) -> tuple[float | None, float | None]:
    """Validate price range (min < max)"""
    if min_price is not None and max_price is not None and min_price > max_price:
        raise ValueError("Min price cannot be greater than max price")
    return min_price, max_price


def is_bit_true(value: Any) -> bool:
    """Check if a MySQL BIT(1) column value is truthy.

    MySQL BIT(1) columns can be returned as int (1/0), bool, or bytes
    depending on the driver and SQLAlchemy configuration.
    """
    return value in (1, True, b"\x01")


def utc_now_naive() -> datetime:
    """Return current UTC time as a naive datetime.

    Used for comparison with MySQL DATETIME columns which store
    naive datetimes (without timezone info) but are implicitly UTC.
    """
    return datetime.now(UTC).replace(tzinfo=None)
