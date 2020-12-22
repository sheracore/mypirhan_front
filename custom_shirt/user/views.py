from rest_frameword import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model # if used custom user model

from .serializers import UserSerializer


class CreateUserView(CreateAPIView):

	model = get_user_model()
	permission_class = [permissions.AllowAny]
	serializer_class = UserSerializer
