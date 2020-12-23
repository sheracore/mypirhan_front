from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


# 127.0.0.1:8000/user/create
CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')


def create_user(**params):
	return get_user_model().objects.create_user(**params)


# Public class test is for unauthenticated users and Private is for authenticated users
class PublicUserApiTests(TestCase):
	"""Test the users api public"""

	def setUp(self):
		self.client = APIClient()

	def test_create_valid_user_success(self):
		"""Test creating user with valid payload is successful"""
		payload = {
			'email' : 'test@sheracore.com',
			'password' : 'testpass',
			'name' : 'test name'

		}
		# If you remember post data structure was json and know payload is
		res = self.client.post(CREATE_USER_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		user = get_user_model().objects.get(**res.data)
		self.assertTrue(user.check_password(payload['password']))
		self.assertNotIn('password',res.data)

	def test_user_exists(self):
		"""Test creating user that already exists fails"""
		payload = {'email' : 'test@sheracore.com','password' : 'testpass'}
		create_user(**payload)

		res = self.client.post(CREATE_USER_URL, payload)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

	def test_password_too_short(self):
		"""Test that password must be more than 5 charach"""
		payload = {'email': 'test@sheracore.com', 'password': 'test'}
		res = self.client.post(CREATE_USER_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
		# To ensure that user have been not created
		user_exists = get_user_model().objects.filter(
			email=payload['email']
			).exists()
		self.assertFalse(user_exists)

	def test_create_token_for_user(self):
		"""Test that a token is created for uesr"""
		payload = {'email':'test@sheracore.com', 'password' : 'testpass'}
		create_user(payload)
		res = self.client.post(TOKEN_URL, payload)

		self.assertIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_200_OK)

	def test_create_token_invalid_credintials(self):
		"""Test that token is not created if invelid credential are given"""
		create_user(email='test@sheracore.com', password='testpass')
		payload = {'email': 'test@sheracore.com', 'password':'wrong'}

		res = self.client.post(TOKEN_URL, payload)

		self.assertNotIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

	def test_create_token_no_user(self):
		"""Test that token is not created is user doesn't exist"""
		payload = {'email': 'test@sheracore.com','password': 'testpass'}
		res = self.client.post(TOKEN_URL, payload)

		self.assertNotIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

	def test_create_token_missing_field(self):
		"""Test that email and password are required"""
		res = self.client.post(TOKEN_URL, {'email': 'one', 'password':''})
		self.assertNotIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)










