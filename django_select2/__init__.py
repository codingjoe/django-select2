"""
This is a Django_ integration of Select2_.

The application includes Select2 driven Django Widgets and Form Fields.

.. _Django: https://www.djangoproject.com/
.. _Select2: https://select2.org/

"""

from django import get_version

from . import _version

__version__ = _version.version
VERSION = _version.version_tuple

if get_version() < "3.2":
    default_app_config = "django_select2.apps.Select2AppConfig"
