import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'reaxAcademi.settings')
django.setup()

User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if password and not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"✅ Superuser '{username}' created successfully.")
else:
    if not password:
        print("⚠️ Superuser creation skipped: no password provided in DJANGO_SUPERUSER_PASSWORD")
    elif User.objects.filter(username=username).exists():
        print(f"ℹ️ Superuser '{username}' already exists, skipping creation.")
