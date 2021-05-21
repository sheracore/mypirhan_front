from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import update_last_login


from django.contrib.auth import get_user_model, authenticate
# For outputing any text to the screen its good idea use this translation tool(gettext_lazy)
from django.utils.translation import gettext_lazy as _


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'name')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name']
        )
        return user

    # purpose of overrid update is insure to using set_password to update password
    def update(self, instance, validated_data):
        """Update a user, setting the password corrcntly and return it"""
        # First we remove the password
        password = validated_data.pop('password', None)
        # super() call ModelSeializer update (default updates function)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class UserRegisterSerializer(serializers.ModelSerializer):

    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'name', 'token')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name']
        )

        payload = JWT_PAYLOAD_HANDLER(user)
        jwt_token = JWT_ENCODE_HANDLER(payload)
        update_last_login(None, user)

        return {
            'email': user.email,
            'name': user.name,
            'token': jwt_token
        }

    # purpose of overrid update is insure to using set_password to update password
    # def update(self, instance, validated_data):
    #     """Update a user, setting the password corrcntly and return it"""
    #     # First we remove the password
    #     password = validated_data.pop('password', None)
    #     # super() call ModelSeializer update (default updates function)
    #     user = super().update(instance, validated_data)

    #     if password:
    #         user.set_password(password)
    #         user.save()

    #     return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    # attrs equals is every fields that make up our serializers (email,password)
    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        # by passing the username(email in here) and password to the authenticate you can authenticate a request
        user = authenticate(
            # context if from this AuthTokenSerializer class
            request=self.context.get('request'),
            # The point is here username=email is necessary for custom user model
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authenticate')

        attrs['user'] = user
        return attrs
