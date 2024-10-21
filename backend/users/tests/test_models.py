# test_models.py
import pytest
from django.contrib.auth import get_user_model
from .factories import UserAccountFactory

User = get_user_model()


@pytest.mark.django_db
def test_user_account_creation():
    user = UserAccountFactory(
        first_name="Alice", last_name="Smith", email="alice@example.com"
    )
    assert user.email == "alice@example.com"
    assert user.first_name == "Alice"
    assert user.last_name == "Smith"
    assert user.check_password("password")
    assert str(user) == "alice@example.com"


@pytest.mark.django_db
def test_create_superuser():
    superuser = User.objects.create_superuser("admin@example.com", "adminpassword")
    assert superuser.email == "admin@example.com"
    assert superuser.is_staff
    assert superuser.is_superuser
    assert superuser.check_password("adminpassword")
