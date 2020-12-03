from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):
	
	def create_user(self, email, password=None, **extra_fields):
		"""creates and saves a Userwith the given email and password"""
		if not email:
			raise ValueError('User must have an email address')

		user = self.model(
			email=self.normalize_email(email),
			**extra_fields
			)

		user.set_password(password)
		user.save(using=self._db)

		return user

	def create_superuser(self, email, password):
		""" creates and saves a superuser with the given email and password"""

		user = self.create_user(
			email,
			password=password,
			)
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)

		return user


class User(AbstractBaseUser):
	"""This is CustomUser"""
	name = models.CharField(max_length=255, default='NewClient')
	email = models.CharField(max_length=255, unique=True)
	active = models.BooleanField(default=True)
	# a admin user; non super-user
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False) # a superuser

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at = models.DateTimeField(auto_now_add=True)

	objects = UserManager()

