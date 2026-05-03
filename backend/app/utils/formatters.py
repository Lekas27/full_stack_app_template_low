from __future__ import annotations

from datetime import UTC, datetime
from decimal import Decimal


def format_price(price: float | Decimal, currency: str = "EUR") -> str:
    """
    Format price with currency symbol.

    Example:
        format_price(150000.50, "EUR") -> "150,000.50 €"
    """
    formatted_number = f"{price:,.2f}"

    currency_symbols = {"EUR": "€", "USD": "$", "GBP": "£"}

    symbol = currency_symbols.get(currency, currency)
    return f"{formatted_number} {symbol}"


def format_area(area: float) -> str:
    """
    Format area with m² symbol.

    Example:
        format_area(75.5) -> "75.5 m²"
    """
    return f"{area:.1f} m²"


def format_date(date: datetime, format: str = "%Y-%m-%d") -> str:
    """
    Format datetime to string.

    Example:
        format_date(datetime.now()) -> "2025-11-18"
    """
    return date.strftime(format)


def format_relative_time(date: datetime) -> str:
    """
    Format datetime as relative time.

    Example:
        format_relative_time(datetime.now() - timedelta(hours=2)) -> "2 hours ago"
    """
    now = datetime.now(UTC)
    diff = now - date.replace(tzinfo=UTC)

    seconds = diff.total_seconds()

    if seconds < 60:
        return "just now"
    if seconds < 3600:
        minutes = int(seconds / 60)
        return f"{minutes} minute{'s' if minutes != 1 else ''} ago"
    if seconds < 86400:
        hours = int(seconds / 3600)
        return f"{hours} hour{'s' if hours != 1 else ''} ago"
    if seconds < 604800:
        days = int(seconds / 86400)
        return f"{days} day{'s' if days != 1 else ''} ago"
    return format_date(date)


def format_elapsed(seconds: float) -> str:
    """Format elapsed seconds as human-readable time."""
    if seconds < 60:
        return f"{seconds:.1f}s"
    minutes = int(seconds // 60)
    remaining_seconds = seconds % 60
    return f"{minutes}m {remaining_seconds:.0f}s"


def build_image_variants(file_name: str) -> dict[str, str]:
    """Build image variants dict with size suffixes for different resolutions.

    Args:
        file_name: Original image file name (e.g. "photo.jpg").

    Returns:
        Dict mapping size keys to WebP variant filenames.
    """
    name_without_ext = file_name.rsplit(".", 1)[0] if "." in file_name else file_name
    return {
        "xs": f"{name_without_ext}-xs.webp",
        "sm": f"{name_without_ext}-sm.webp",
        "md": f"{name_without_ext}-md.webp",
        "lg": f"{name_without_ext}-lg.webp",
    }
