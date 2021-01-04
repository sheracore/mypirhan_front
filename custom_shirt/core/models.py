from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager 

from django.conf import settings # recommnded to retrieve setting from the django settings(custom_shit.setting)

 
class UserManager(BaseUserManager):
	
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


class User(AbstractBaseUser):
	"""Custom user model that suppors using email instead of username"""
	email = models.EmailField(max_length=64, unique=True)
	name = models.CharField(max_length=64, null=True)
	address1 = models.CharField(max_length=255, null=True)
	address2 = models.CharField(max_length=255, null=True)
	city = models.CharField(max_length=64, default='Tehran', null=True)
	province = models.CharField(max_length=64, default='Tehran', null=True)
	postal_code = models.CharField(max_length=32, null=True)
	phone = models.CharField(max_length=12, null=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)

	
	USERNAME_FIELD = 'email'

	objects = UserManager()

	def has_perm(self, perm, obj=None):
		return self.is_superuser

	def has_module_perms(self, app_label):
		return self.is_superuser


class Supplier(models.Model):
	"""Supplier to be used for products"""
	"""Instead of reffrence user object directly that we could do
	   we ganna use best practice method to retrieving auth user model
	   setting from django settings"""
	company_name = models.CharField(max_length=64)
	type_good = models.CharField(max_length=64)
	discount_percent = models.IntegerField(null=True)
	url = models.URLField(max_length=100, null=True, unique=True)
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		)

	def __str__(self):
		return self.company_name