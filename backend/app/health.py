from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/live")
def liveness_probe() -> dict[str, str]:
    return {"status": "alive"}


@router.get("/ready")
def readiness_probe() -> dict[str, str]:
    return {"status": "ready"}
