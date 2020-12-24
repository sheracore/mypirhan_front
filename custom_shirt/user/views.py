from rest_framework import permissions, generics, authentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from user.serializers import UserSerializer, AuthTokenSerializer


class CreateUserView(generics.CreateAPIView):
	"""Create a new user in the system"""
	serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
	"""Create a new auth token for user"""
	serializer_class = AuthTokenSerializer
	# Is to see this endpoint in to browser ---> browsable api
	renderred_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
	"""Manage the authenticated view"""
	serializer_class = UserSerializer
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	# We override get_object to just retrieve model for loged in user (self.request.user)
	def get_object(self):
		"""Retrieve and return authenticated user"""
		return self.request.user