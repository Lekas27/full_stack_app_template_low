from __future__ import annotations

import re
from typing import Any, NamedTuple


class SearchTerm(NamedTuple):
    """Represents a search term (word or quoted phrase)"""

    term: str
    is_phrase: bool


def parse_search_query(query: str) -> list[SearchTerm]:
    """
    Parse search query into terms and quoted phrases.

    Example:
        "luxury apartment \"new building\" podgorica"
        -> [
            SearchTerm("luxury", False),
            SearchTerm("apartment", False),
            SearchTerm("new building", True),  # quoted phrase
            SearchTerm("podgorica", False)
        ]
    """
    terms: list[SearchTerm] = []

    # Extract quoted phrases first
    quoted_pattern = r'"([^"]+)"'
    quoted_matches = re.finditer(quoted_pattern, query)

    # Store quoted phrases and their positions
    quoted_phrases = []
    for match in quoted_matches:
        phrase = match.group(1).strip()
        if phrase:
            terms.append(SearchTerm(phrase, is_phrase=True))
            quoted_phrases.append(match.group(0))

    # Remove quoted phrases from query to get individual words
    remaining_query = query
    for quoted in quoted_phrases:
        remaining_query = remaining_query.replace(quoted, " ")

    # Extract individual words
    words = remaining_query.split()
    for word in words:
        word = word.strip()
        if word:
            terms.append(SearchTerm(word, is_phrase=False))

    return terms


def build_search_filter(terms: list[SearchTerm], column: Any) -> Any:
    """
    Build SQLAlchemy filter for search terms.

    Args:
        terms: List of search terms from parse_search_query()
        column: SQLAlchemy column to search (e.g., Ad.title)

    Returns:
        SQLAlchemy AND filter
    """
    from sqlalchemy import and_

    filters = []

    for term in terms:
        if term.is_phrase:
            # Exact phrase match
            filters.append(column.like(f"%{term.term}%"))
        else:
            # Word match
            filters.append(column.like(f"%{term.term}%"))

    return and_(*filters) if filters else True
