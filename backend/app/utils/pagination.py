from __future__ import annotations

from collections.abc import Sequence
from math import ceil
from typing import Annotated, Any, Generic, TypeVar, cast, overload

from fastapi import Query
from pydantic import BaseModel, ConfigDict, NonNegativeInt
from sqlalchemy import func, select
from sqlalchemy.orm import Session, noload
from sqlalchemy.sql import Select

T = TypeVar("T")


class PageResponse(BaseModel, Generic[T]):
    """Generic pagination response"""

    content: list[T]
    total_elements: int
    total_pages: int
    current_page: int
    page_size: int
    has_next: bool
    has_previous: bool

    @classmethod
    def create(
        cls,
        content: list[T],
        total_elements: int,
        page: int,
        page_size: int,
    ) -> PageResponse[T]:
        """Create paginated response"""
        total_pages = (total_elements + page_size - 1) // page_size

        return cls(
            content=content,
            total_elements=total_elements,
            total_pages=total_pages,
            current_page=page,
            page_size=page_size,
            has_next=page < total_pages,
            has_previous=page > 1,
        )


class PaginationParams(BaseModel):
    """Pagination parameters for requests"""

    page: int = 1
    page_size: int = 20

    def get_offset(self) -> int:
        """Calculate SQL offset"""
        return (self.page - 1) * self.page_size

    def get_limit(self) -> int:
        """Get SQL limit"""
        return self.page_size


def get_pagination_params(
    page: Annotated[int, Query(ge=1, description="Page number")] = 1,
    size: Annotated[int, Query(le=500, description="Page size")] = 50,
) -> PaginationParams:
    return PaginationParams(page=page, page_size=size)


class Page[T](BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    total: NonNegativeInt
    items: Sequence[T]
    pages: NonNegativeInt | None


def len_or_none(obj: Any) -> int | None:
    try:
        return len(obj)
    except TypeError:
        return None


@overload
def paginate[T](
    query: Select[tuple[T]], pagination_params: PaginationParams, db: Session
) -> Page[T]: ...
@overload
def paginate[T: tuple[Any, ...]](
    query: Select[T], pagination_params: PaginationParams, db: Session
) -> Page[T]: ...


def paginate(query: Select[Any], pagination_params: PaginationParams, db: Session) -> Page[Any]:
    total = cast(
        int,
        db.scalar(
            select(func.count()).select_from(query.order_by(None).options(noload("*")).subquery())
        ),
    )

    pages = None
    limit = None
    offset = None
    if pagination_params.page_size > 0:
        limit = pagination_params.page_size
        offset = (pagination_params.page - 1) * limit
        pages = ceil(total / limit)

    results = db.execute(query.limit(limit).offset(offset)).all()
    items = [
        item[0] if len_or_none(item) == 1 else item for item in results
    ]  # get first "column" from row if only one column, else get entire row

    return Page(total=total, items=items, pages=pages)
