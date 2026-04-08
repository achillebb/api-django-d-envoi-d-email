from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

from drf_yasg.utils import swagger_auto_schema

from .serializers import ContactSerializer, InscriptionSerializer


# ───────────── CONTACT ─────────────
@swagger_auto_schema(method='post', request_body=ContactSerializer)
@api_view(['POST'])
def contact_view(request):

    serializer = ContactSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    contact = serializer.save()

    try:
        send_mail(
            subject=f"[Contact] {contact.sujet}",
            message=(
                f"Nom      : {contact.nom}\n"
                f"Email    : {contact.email}\n"
                f"Tél      : {contact.telephone or '—'}\n\n"
                f"{contact.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
    except Exception as e:
        print(f"[Email error] {e}")

    return Response(
        {"message": "Votre message a bien été envoyé !"},
        status=status.HTTP_200_OK
    )


# ───────────── INSCRIPTION ─────────────
@swagger_auto_schema(method='post', request_body=InscriptionSerializer)
@api_view(['POST'])
def inscription_view(request):

    serializer = InscriptionSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    inscription = serializer.save()

    detail = (
        f"Formation : {inscription.formation}"
        if inscription.formation
        else f"Langue : {inscription.langue}"
    )

    try:
        send_mail(
            subject=f"[Inscription] {inscription.nom} {inscription.prenom}",
            message=(
                f"Nom      : {inscription.nom} {inscription.prenom}\n"
                f"Email    : {inscription.email}\n"
                f"Tél      : {inscription.telephone}\n"
                f"Modalité : {inscription.modalite}\n"
                f"{detail}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
    except Exception as e:
        print(f"[Email error] {e}")

    return Response(
        {"message": "Inscription enregistrée avec succès !"},
        status=status.HTTP_200_OK
    )