from __future__ import annotations

import secrets
import time

from tsidpy import TSID


def generate_tsid() -> int:
    """Generate a Time-Sorted Distributed ID (TSID).

    Matches Java's io.hypersistence.utils.hibernate.id.Tsid bit layout:
    42 bits timestamp (milliseconds) + 22 bits random = 64-bit BIGINT.

    Used for: refresh_tokens.id, user_reset_password_tokens.token (PK),
    user_previous_passwords.id.
    """
    timestamp_ms = int(time.time() * 1000)
    random_component = secrets.randbits(22)
    return (timestamp_ms << 22) | random_component


def generate_tsid_int_v2() -> int:
    return int(TSID.create().number)
