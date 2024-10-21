# test_views.py
import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from .factories import UserAccountFactory
from django.contrib.auth import get_user_model


@pytest.mark.django_db
def test_custom_token_obtain_pair_view():
    user = UserAccountFactory()
    client = APIClient()
    response = client.post(
        "/api/jwt/create/", {"email": user.email, "password": "password"}
    )
    assert response.status_code == 200
    assert "Login successful" in response.data["detail"]


@pytest.mark.django_db
def test_custom_token_refresh_view():
    user = UserAccountFactory()
    refresh = RefreshToken.for_user(user)
    client = APIClient()
    client.cookies.load({"refresh": str(refresh)})
    response = client.post("/api/jwt/refresh/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_logout_view():
    # Create a user
    user = UserAccountFactory.create()

    # Obtain JWT tokens for the user
    client = APIClient()
    obtain_token_response = client.post(
        "/api/jwt/create/", {"email": user.email, "password": "password"}
    )
    assert obtain_token_response.status_code == 200

    # Attempt to logout
    logout_response = client.post("/api/logout/")
    assert logout_response.status_code == 204
    assert logout_response.cookies["access"].value == ""
    assert logout_response.cookies["refresh"].value == ""


User = get_user_model()


@pytest.mark.django_db
def test_successful_user_creation():
    client = APIClient()
    user_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "$9827134a123asaFA",
        "re_password": "$9827134a123asaFA",
    }
    response = client.post("/api/users/", user_data)
    assert response.status_code == 201
    assert User.objects.filter(email="john.doe@example.com").exists()


@pytest.mark.django_db
def test_user_creation_with_invalid_data():
    client = APIClient()
    invalid_user_data = {
        "first_name": "",
        "last_name": "Doe",
        "email": "invalid-email",
        "password": "$9827134a123asaFA",
        "re_password": "$9827134a123asaFA",
    }
    response = client.post("/api/users/", invalid_user_data)
    assert response.status_code == 400


@pytest.mark.django_db
def test_duplicate_user_creation():
    UserAccountFactory(email="alice@example.com")
    client = APIClient()
    duplicate_user_data = {
        "first_name": "Alice",
        "last_name": "Wonderland",
        "email": "alice@example.com",
        "password": "$9827134a123asaFA",
        "re_password": "$9827134a123asaFA",
    }
    response = client.post("/api/users/", duplicate_user_data)
    assert response.status_code == 400
