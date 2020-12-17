"""
This module initializes Sentry for error reporting.

It should be imported ONCE (and only once) by either settings.py or asgi.py.
"""

import logging

import sentry_sdk
from decouple import config
from sentry_sdk.integrations.asgi import (  # noqa: F401; type: ignore
    SentryAsgiMiddleware,
)
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.redis import RedisIntegration

from modularhistory.constants.misc import Environments
from modularhistory.environment import ENVIRONMENT, VERSION

SEND_EVENTS = (
    config('SEND_SENTRY_EVENTS', cast=bool, default=False)
    if ENVIRONMENT == Environments.DEV
    else True
)


def filter(event, hint):
    """Filter events to be sent to Sentry."""
    logging.info(f'Sentry sees: {hint}')
    return event if SEND_EVENTS else None


# Initialize the Sentry SDK for error reporting
SENTRY_DSN = config('SENTRY_DSN')
sentry_sdk.init(
    before_send=filter,
    # https://docs.sentry.io/platforms/python/configuration/options/#dsn
    dsn=SENTRY_DSN,
    # https://docs.sentry.io/platforms/python/configuration/environments/
    environment=ENVIRONMENT,
    # https://docs.sentry.io/platforms/python/configuration/integrations/
    integrations=[
        DjangoIntegration(),
        RedisIntegration(),
    ],
    # https://docs.sentry.io/platforms/python/configuration/releases/
    release=f'modularhistory@{VERSION}',
    # Associate users to errors (using django.contrib.auth):
    # https://docs.sentry.io/platforms/python/configuration/options/#send-default-pii
    send_default_pii=True,
    # https://docs.sentry.io/platforms/python/performance/
    traces_sample_rate=0.5,
)
