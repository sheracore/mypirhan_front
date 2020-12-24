from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


# 127.0.0.1:8000/user/create
CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


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
		create_user(**payload)
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

	def test_retrive_user_unauthorized(self):
		"""Test that authentication is required for users"""
		res = self.client.get(ME_URL)

		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
	"""Test api requests that require authentication"""

	def setUp(self):
		self.user = create_user(
			email='private@sheracore.com',
			password='testpass',
			name='name'
			)
		self.client = APIClient()
		self.client.force_authenticate(user=self.user)

	def test_retrieve_profile_successfull(self):
		"""Test retrieving profile for loggen in user"""
		res = self.client.get(ME_URL)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, {
			'name': self.user.name,
			'email': self.user.email,
			})

	def test_post_me_not_allowed(self):
		"""Test POST is not allowd on the me url"""
		res = self.client.post(ME_URL,{})

		self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

	def test_update_user_profile(self):
		"""Test updating the user profile for authenticated user"""
		payload = {'name': 'new name', 'password': 'newpassord'}

		res = self.client.patch(ME_URL, payload)

		self.user.refresh_from_db()
		self.assertEqual(self.user.name, payload['name'])
		self.assertTrue(self.user.check_password(payload['password']))
		self.assertEqual(res.status_code, status.HTTP_200_OK)













