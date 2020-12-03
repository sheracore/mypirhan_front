from django.test import TestCase
from django.contrib.auth import get_user_model


class UsersManagersTest(TestCase):

	def test_create_user_with_email_successful(self):
		password = 'sheracore123'
		email = 'sheracore@sherashirt.com'
		user = get_user_model().objects.create_user(
			email=email,
		    password=password
		    )

		# Just by using check_password function you can 
		# Check password beacuse password is encrypted
		self.assertEqual(user.email,email)
		self.assertTrue(user.check_password('sheracore123'))

	def test_new_user_email_normalized(self):
		"""Test tht email for a new user is normalized"""
		email = 'test@SHERACORE.com'
		user = get_user_model().objects.create_user(email, 'test123')

		self.assertEqual(user.email, email.lower())
	