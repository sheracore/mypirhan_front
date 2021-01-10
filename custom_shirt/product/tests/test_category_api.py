from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Category

from product.serializers import CategorySerializer


CATEGORY_URL = reverse('product:category-list')

class PublicCategoryTest(TestCase):
	"""Public test on Category"""
	def setUp(self):
		self.client = APIClient()

	def test_create_login_required(self):
		"""Test for create required login"""
		res = self.client.post(CATEGORY_URL,category_type="Musk")
		
		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_retrieve_list_category(self):
		"""Test retrieving list of categories"""
		Category.objects.create(category_type='Tshirt')
		Category.objects.create(category_type='Mug')
		
		res = self.client.get(CATEGORY_URL)

		categories = Category.objects.all()
		serializer = CategorySerializer(categories, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

class PrivateCategoryTest(TestCase):
	"""Private tset on Category"""
	def setUp(self):
		self.client = APIClient()
		self.user = get_user_model().objects.create_user(
			"test@sheracore.com",
			"testpass"
			)
		self.client.force_authenticate(user=self.user)

	def test_create_is_staff_required(self):
		"""Test for create required login"""
		payload = {"category_type" : "MuskTest"}
		res = self.client.post(CATEGORY_URL, payload)
		
		self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

	def test_create_category(self):
		"""Create category just by staff"""
		self.user.is_staff = True

		payload = {"category_type" : "MuskTest"}
		res = self.client.post(CATEGORY_URL, payload)

		category_exist = Category.objects.filter(
			category_type=payload["category_type"]
			).exists()

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		self.assertTrue(category_exist)