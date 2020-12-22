from rest_framework import serializers

from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True)

	class meta:
		model = get_user_model()
		
		fields = ('id','email')

	# def create(self, validation_date):
	# 	user = get_user_model().objects.create_user(
	# 		email=validation_date['email'],
	# 		password=validation_date['password']
	# 		)
	# 	return 

