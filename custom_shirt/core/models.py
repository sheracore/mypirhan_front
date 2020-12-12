from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

 
class UserManager(BaseUserManager, PermissionsMixin):
	
	def create_user(self, email, password=None, **extra_fields):
		"""Create and save a new user"""
		if not email:
			raise ValueError("users most have an email address")

		user = self.model(email=self.normalize_email(email), **extra_fields)
		user.set_password(password)
		user.save(using=self._db)

		return user

	def create_superuser(self, email, password):
		"""Create a superuser"""
		user = self.create_user(email, password)
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)

		return user



class User(AbstractBaseUser, PermissionsMixin):
	"""Custom user model that suppors using email instead of username"""
	email = models.EmailField(max_length=255, unique=True)
	name = models.CharField(max_length=255)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	USERNAME_FIELD = 'email'

	objects = UserManager()

