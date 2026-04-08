"""
Django settings for reaxAcademi project.
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# ── Charger les variables d'environnement ─────────────────────────
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# =====================
# SÉCURITÉ
# =====================
SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-dev-key-change-me"
)

DEBUG = True

ALLOWED_HOSTS = ["*"]

# =====================
# APPLICATIONS
# =====================
INSTALLED_APPS = [
    # Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',
    'drf_yasg',

    # Local apps
    'forms',
]

# =====================
# MIDDLEWARE
# =====================
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# =====================
# CORS CONFIG
# =====================
CORS_ALLOW_ALL_ORIGINS = True  # Pour développement uniquement
CORS_ALLOW_CREDENTIALS = True

# Configuration CORS plus spécifique pour React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# =====================
# URLS / WSGI
# =====================
ROOT_URLCONF = 'reaxAcademi.urls'
WSGI_APPLICATION = 'reaxAcademi.wsgi.application'

# =====================
# TEMPLATES
# =====================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# =====================
# DATABASE
# =====================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# =====================
# AUTH PASSWORD
# =====================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# =====================
# INTERNATIONALISATION
# =====================
LANGUAGE_CODE = 'fr'
TIME_ZONE = 'Africa/Douala'
USE_I18N = True
USE_TZ = True
LOCALE_PATHS = [BASE_DIR / 'locale']

# =====================
# STATIC / MEDIA
# =====================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static'] if (BASE_DIR / 'static').exists() else []

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# =====================
# DJANGO REST FRAMEWORK
# =====================
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}

# =====================
# EMAIL CONFIGURATION - CORRIGÉE ✅
# =====================
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'achillemolo403@gmail.com')  # ✅ Changé pour ton nouvel email
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')  # Mot de passe d'application
DEFAULT_FROM_EMAIL = f'ReaxAcademy <{EMAIL_HOST_USER}>'

# Email qui reçoit les messages du formulaire de contact
CONTACT_EMAIL = os.getenv('CONTACT_EMAIL', 'achillemolo403@gmail.com')  # ✅ Ajouté

# =====================
# MESSAGES FLASH (optionnel)
# =====================
from django.contrib.messages import constants as messages
MESSAGE_TAGS = {
    messages.ERROR: 'danger',
    messages.SUCCESS: 'success',
    messages.INFO: 'info',
    messages.WARNING: 'warning',
}

# =====================
# DEFAULT PRIMARY KEY
# =====================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'