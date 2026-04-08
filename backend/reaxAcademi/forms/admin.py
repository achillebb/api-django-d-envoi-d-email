from django.contrib import admin
from .models import Inscription, Contact

# ── Inscription ───────────────────────────────
@admin.register(Inscription)
class InscriptionAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "email", "formation", "langue", "modalite", "created_at")
    list_filter = ("formation", "langue", "modalite")
    search_fields = ("nom", "prenom", "email")

# ── Contact ──────────────────────────────────
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("nom", "email", "telephone", "sujet", "created_at")
    search_fields = ("nom", "email", "sujet")