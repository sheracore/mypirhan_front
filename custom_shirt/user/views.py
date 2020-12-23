from rest_framework import permissions
from rest_framework import generics
from django.contrib.auth import get_user_model # if used custom user model

from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
	"""Create a new user in the system"""
	# model = get_user_model()
	# permission_class = [permissions.AllowAny]
	serializer_class = UserSerializer
