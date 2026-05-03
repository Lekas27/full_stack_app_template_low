from __future__ import annotations

import logging
from logging import INFO, Formatter, Handler, PlaceHolder, StreamHandler, getLogger

logger = getLogger(__name__)


def set_up_logging() -> None:
    """
    Configures logging for the application.

    Sets up logging handlers based on the application's DEBUG setting:
    - In production mode (DEBUG=False), configures a standard StreamHandler
    with a basic format.

    This setup applies to the root logger and all defined loggers within the application,
    ensuring consistent logging behavior. The propagation of log messages is disabled
    for the application logger to prevent duplicate log entries, particularly in the
    context of Celery workers.
    """

    # Root logger
    root_logger = getLogger()
    root_logger.handlers = _get_handlers()

    # App's logging config
    app, *_ = __name__.split(".")
    app_logger = getLogger(app)
    app_logger.handlers = _get_handlers()
    app_logger.level = INFO
    # Disables propagation because Celery would repeat the same log multiple times
    app_logger.propagate = False

    # TODO: For Boris
    for celery_logger_name in [
        "celery",
        "celery.worker.strategy",
        "celery.app.trace",
        "celery.apps.worker",
        "celery.worker.consumer.mingle",
        "celery.beat",
    ]:
        celery_logger = getLogger(celery_logger_name)
        celery_logger.handlers = _get_handlers()
        celery_logger.level = INFO
        # Disables propagation because Celery would repeat the same log multiple times
        celery_logger.propagate = False

    for _logger in logging.root.manager.loggerDict.values():
        if isinstance(_logger, PlaceHolder):
            continue

        # replace the existing handlers with our handlers
        if _logger.handlers and (handlers := _get_handlers()):
            _logger.handlers = handlers

    logger.info("Logging setup finished")


def _get_handlers() -> list[Handler]:
    """
    Returns a list of logging handlers based on the application's settings.

    Returns:
        A list of configured Handler objects to be used by the application's loggers.
    """

    handler = StreamHandler()
    handler.setFormatter(
        Formatter("[%(levelname)s] %(message)s - %(pathname)s:%(lineno)s %(funcName)s")
    )

    return [handler]
