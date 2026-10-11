from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DEBUG = True

DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}

INSTALLED_APPS = (
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.staticfiles",
    "django.contrib.admin",
    "django_select2",
    "tests.testapp",
)

STATIC_URL = "/static/"

MEDIA_ROOT = BASE_DIR / "media"

SITE_ID = 1
ROOT_URLCONF = "tests.testapp.urls"

LANGUAGES = [
    ("de", "German"),
    ("en", "English"),
]
LANGUAGE_CODE = "en"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "DIRS": ["templates"],
    },
]

SECRET_KEY = "123456"

USE_I18N = True
USE_TZ = True
