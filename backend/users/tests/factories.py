# factories.py
import factory
from django.contrib.auth import get_user_model


class UserAccountFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Sequence(lambda n: f"user{n}@example.com")
    first_name = "John"
    last_name = "Doe"
    password = factory.PostGenerationMethodCall("set_password", "password")
