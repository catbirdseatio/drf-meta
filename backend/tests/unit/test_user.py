import pytest
from django.contrib.auth import get_user_model


User = get_user_model()
pytestmark = pytest.mark.django_db


class TestUsersManager:
    user = {"email": "normal@user.com", "password": "fooBar123"}
    superuser = {"email": "clark@dailyplanet.com", "password": "fooBar123"}

    def test_create_user(self):
        user = User.objects.create_user(**self.user)
        assert user.email == self.user["email"]
        assert user.is_active
        assert not user.is_staff
        assert not user.is_superuser

    def test_create_user_fail_no_arguments(self):
        with pytest.raises(TypeError):
            User.objects.create_user()

    def test_create_user_fail_empty_email_no_password(self):
        with pytest.raises(TypeError):
            User.objects.create_user(email="")

    def test_create_user_fail_empty_email_with_password(self):
        with pytest.raises(ValueError):
            User.objects.create_user(email="", password="fooBar")

    def test_create_superuser(self):
        user = User.objects.create_superuser(**self.superuser)
        assert user.email == self.superuser["email"]
        assert user.is_active
        assert user.is_staff
        assert user.is_superuser

    def test_create_superuser_fail_is_superuser_kwarg_false(self):
        with pytest.raises(ValueError):
            User.objects.create_superuser(**self.superuser, is_superuser=False)
