from django.db import models
# forms/models.py - Version améliorée

from django.db import models

class Inscription(models.Model):
    # Utilise des slugs (identifiants sans accents ni espaces) pour les choix
    FORMATION_CHOICES = [
        ("maintenance", "Maintenance"),
        ("marketing-digital", "Marketing Digital"),
        ("comptabilite", "Comptabilité"),
        ("dev-web", "Développement Web"),
        ("dev-mobile", "Développement Mobile"),
        ("secretaire-bureautique", "Secrétariat Bureautique"),
        ("secretaire-comptable", "Secrétariat Comptable"),
        ("compta-gestion", "Comptabilité et Gestion"),
        ("montage-audio-visuel", "Montage Audio Visuel"),
        ("graphisme", "Graphisme de Production"),
        ("maintenance-info", "Maintenance Informatique"),
    ]

    LANGUE_CHOICES = [
        ("francais", "Français"),
        ("anglais", "Anglais"),
        ("chinois", "Chinois"),
        ("italien", "Italien"),
    ]

    MODALITE_CHOICES = [
        ("presentiel", "Présentiel"),  # ← slug sans accent
        ("en-ligne", "En ligne"),      # ← slug avec tiret
        ("hybride", "Hybride"),
    ]

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=30)
    
    formation = models.CharField(
        max_length=50,
        choices=FORMATION_CHOICES,
        null=True,
        blank=True
    )

    langue = models.CharField(
        max_length=50,
        choices=LANGUE_CHOICES,
        null=True,
        blank=True
    )

    modalite = models.CharField(
        max_length=20,
        choices=MODALITE_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

# ── Modèle Contact ─────────────────────────────────────────────
class Contact(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=30, blank=True, null=True)
    sujet = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nom} - {self.sujet}"