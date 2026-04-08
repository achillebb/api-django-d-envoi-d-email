from rest_framework import serializers
from .models import Inscription, Contact

# ── Serializer pour Contact ─────────────────────────────
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["nom", "email", "telephone", "sujet", "message"]

# ── Serializer pour Inscription ────────────────────────
class InscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscription
        fields = ["nom", "prenom", "email", "telephone",
                  "formation", "langue", "modalite"]

    def validate(self, data):
        formation = data.get("formation")
        langue = data.get("langue")

        # Vérifie qu’au moins formation ou langue est renseigné
        if not formation and not langue:
            raise serializers.ValidationError(
                "Vous devez choisir une formation ou une langue."
            )
        return data