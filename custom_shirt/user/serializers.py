from rest_framework import serializers

from django.contrib.auth import get_user_model, authenticate
# For outputing any text to the screen its good idea use this translation tool(gettext_lazy)
from django.utils.translation import gettext_lazy as _


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

# class AuthTokenSerializer(serializers.Serializer):
# 	"""Serializer for the user authentication object"""
# 	email = serializers.CharField()
# 	password = serializers.CharField(
# 		style={'input_type': 'password'},
# 		trim_whitespace=False
# 		)

# 	# attrs equals is evry fields that make up our serializers (email,password)
# 	def validate(self, attrs):
# 		"""Validate and authenticate the user"""
# 		email = attrs.get('email')
# 		password = attrs.get('password')
		
		# by passing the username(email in here) and password to the authenticate you can authenticate a request
# 		user = authenticate(
# 			request = self.context.get('request'), # context if from this AuthTokenSerializer class
# 			# The point is here username=email is necessary for custom user model
# 			username=email,
# 			password=password
# 			)
# 		if not user:
# 			msg = _('Unable to authenticate with provided credentials')
# 			raise serializers.ValidationError(msg, code='authenticate')

# 		attrs['user'] = user
# 		return attrs

class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
        )

    def validate(self, attrs):
        """Validte and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        # by passing the username(email in here) and password to the authenticate you can authenticate a request
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
            )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs