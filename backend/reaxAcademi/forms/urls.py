from django.urls import path
from .views import contact_view, inscription_view

urlpatterns = [
    path("contact/", contact_view, name="contact"),
    path("inscription/", inscription_view, name="inscription"),
]