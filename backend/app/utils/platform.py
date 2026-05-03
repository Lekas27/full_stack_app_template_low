from __future__ import annotations

_PLATFORM_APP = "app"
_PLATFORM_WEB = "web"
_APP_USER_AGENT = "estitor-mobile-app"


def resolve_platform(user_agent: str | None) -> str:
    """Resolve platform from user-agent string.

    Returns 'app' if the user-agent indicates a mobile app (custom identifier or WebView),
    'web' otherwise. Matches Java's PlatformResolver logic.
    """
    if not user_agent:
        return _PLATFORM_WEB

    if _APP_USER_AGENT in user_agent:
        return _PLATFORM_APP

    ua = user_agent.lower()

    if "android" in ua and "; wv" in ua:
        return _PLATFORM_APP

    if (
        any(device in ua for device in ("iphone", "ipad", "ipod"))
        and "applewebkit" in ua
        and "safari/" not in ua
    ):
        return _PLATFORM_APP

    return _PLATFORM_WEB
