"""Settings for Django-Select2."""

from appconf import AppConf
from django.conf import settings  # NOQA

__all__ = ("settings", "Select2Conf")

from django.contrib.admin.widgets import SELECT2_TRANSLATIONS


class Select2Conf(AppConf):
    """Settings for Django-Select2."""

    CACHE_BACKEND = "default"
    """
    Django-Select2 uses Django's cache to sure a consistent state across multiple machines.

    Example of settings.py::

        CACHES = {
            "default": {
                "BACKEND": "django_redis.cache.RedisCache",
                "LOCATION": "redis://127.0.0.1:6379/1",
                "OPTIONS": {
                    "CLIENT_CLASS": "django_redis.client.DefaultClient",
                }
            },
            'select2': {
                "BACKEND": "django_redis.cache.RedisCache",
                "LOCATION": "redis://127.0.0.1:6379/2",
                "OPTIONS": {
                    "CLIENT_CLASS": "django_redis.client.DefaultClient",
                }
            }
        }

        # Set the cache backend to select2
        SELECT2_CACHE_BACKEND = 'select2'

    .. tip:: To ensure a consistent state across all you machines you need to user
        a consistent external cache backend like Memcached, Redis or a database.

    .. note::
        Should you have copied the example configuration please make sure you
        have Redis setup. It's recommended to run a separate Redis server in a
        production environment.

    .. note:: The timeout of select2's caching backend determines
        how long a browser session can last.
        Once widget is dropped from the cache the json response view will return a 404.
    """
    CACHE_PREFIX = "select2_"
    """
    If you caching backend does not support multiple databases
    you can isolate select2 using the cache prefix setting.
    It has set `select2_` as a default value, which you can change if needed.
    """

    JS = ["admin/js/vendor/select2/select2.full.min.js"]
    """
    The URI for the Select2 JS file. By default this points to version shipped with Django.

    If you want to select the version of the JS library used, or want to serve it from
    the local 'static' resources, add a line to your settings.py like so::

        SELECT2_JS = ['assets/js/select2.min.js']

    If you provide your own JS and would not like Django-Select2 to load any, change
    this setting to a blank string like so::

        SELECT2_JS = []

    .. tip:: Change this setting to a local asset in your development environment to
        develop without an Internet connection.
    """

    CSS = ["admin/css/vendor/select2/select2.min.css"]
    """
    The URI for the Select2 CSS file. By default this points to version shipped with Django.

    If you want to select the version of the library used, or want to serve it from
    the local 'static' resources, add a line to your settings.py like so::

        SELECT2_CSS = ['assets/css/select2.css']

    If you want to add more css (usually used in select2 themes), add a line
    in settings.py like this::

        SELECT2_CSS = [
            'assets/css/select2.css',
            'assets/css/select2-theme.css',
        ]

    If you provide your own CSS and would not like Django-Select2 to load any, change
    this setting to a blank string like so::

        SELECT2_CSS = []

    .. tip:: Change this setting to a local asset in your development environment to
        develop without an Internet connection.
    """

    THEME = "default"
    """
    Select2 supports custom themes using the theme option so you can style Select2
    to match the rest of your application.

    .. tip:: When using other themes, you may need use select2 css and theme css.
    """

    I18N_PATH = "admin/js/vendor/select2/i18n"
    """
    The base URI for the Select2 i18n files. By default this points to version shipped with Django.

    If you want to select the version of the I18N library used, or want to serve it from
    the local 'static' resources, add a line to your settings.py like so::

        SELECT2_I18N_PATH = 'assets/js/i18n'

    .. tip:: Change this setting to a local asset in your development environment to
        develop without an Internet connection.
    """

    I18N_AVAILABLE_LANGUAGES = list(SELECT2_TRANSLATIONS.values())
    """
    List of available translations.

    List of ISO 639-1 language codes that are supported by Select2.
    If currently set language code (e.g. using the HTTP ``Accept-Language`` header)
    is in this list, Django-Select2 will use the language code to create load
    the proper translation.

    The full path for the language file consists of::

        from django.utils import translations

        full_path = "{i18n_path}/{language_code}.js".format(
            i18n_path=settings.DJANGO_SELECT2_I18N,
            language_code=translations.get_language(),
        )

    ``settings.DJANGO_SELECT2_I18N`` refers to :attr:`.I18N_PATH`.
    """

    JSON_ENCODER = "django.core.serializers.json.DjangoJSONEncoder"
    """
    A :class:`JSONEncoder<json.JSONEncoder>` used to generate the API response for the model widgets.

    A custom JSON encoder might be useful when your models uses
    a special primary key, that isn't serializable by the default encoder.
    """

    class Meta:
        """Prefix for all Django-Select2 settings."""

        prefix = "SELECT2"
