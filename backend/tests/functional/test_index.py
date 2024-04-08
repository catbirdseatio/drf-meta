import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status


User = get_user_model()
pytestmark = pytest.mark.django_db


class TestIndex:
    url = reverse("index")

    def test_authenticated_get_pass(self, authenticate, api_client):
        authenticate(api_client)

        response = api_client.get(self.url)
        print(response)
        assert response.status_code == status.HTTP_200_OK

    def test_unauthenticated_get_403(self, api_client):
        response = api_client.get(self.url)
        print(response)
        assert response.status_code == status.HTTP_403_FORBIDDEN
