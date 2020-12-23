from rest_framework import serializers

from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = get_user_model()		
		fields = ('email','password','name')
		extra_kwargs = {'password': {'write_only':True, 'min_length' :5}}

	def create(self, validated_data):
		"""Create a new user with encrypted password and return it"""
		user = get_user_model().objects.create_user(
			email=validated_data['email'],
			password=validated_data['password'],
			name=validated_data['name']
			)
		return user

class AuthTokenSerializer(serializers.Serializer):
	"""Serializer for the user authentication object"""
	