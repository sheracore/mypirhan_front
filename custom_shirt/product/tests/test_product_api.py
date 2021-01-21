from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Product, Supplier, Category

from product.serializers import ProductSerializer


PRODUCTS_URL = reverse('product:product-list')


class PublicProductApiTest(TestCase):
	"""Public test on product api"""
	
	def setUp(self):
		self.client = APIClient()

	def test_retrieve_product_does_not_login_required(self):
		"""Test that retrieving product does not need to login"""
		res = self.client.get(PRODUCTS_URL)
		self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivateProductApiTest(TestCase):
	"""Test the privete products can be retrieved by authorized user"""

	def setUp(self):
		self.client = APIClient()
		self.user = get_user_model().objects.create_user(
			email='test@sheracore.com',
			password='testpass'
			)
		self.client.force_authenticate(self.user)
		self.supplier = Supplier.objects.create(user=self.user, company_name='Pirhansara 16 xordad', type_good="Tshirt")
		self.category = Category.objects.create(category_type="Thirt")

	def test_create_is_staff_required(self):
		"""Test for create required login"""
		payload = {
			"product_name" : "lbaskordi",
			"product_brand" : "saqqez",
			"product_description" : "the best",
			"size" : "mediom",
			"supplier" : self.supplier.id,
			"category" : self.category.id
			}
		res = self.client.post(PRODUCTS_URL, payload)
		
		self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


	def test_retrieve_products_list(self):
		"""Test retrieving a list of proructs"""		
		Product.objects.create(
			supplier=self.supplier,
			category=self.category,
			product_name="short",
			)
		Product.objects.create(
			supplier=self.supplier,
			category=self.category,
			product_name="patol",
			)
		res = self.client.get(PRODUCTS_URL)

		products = Product.objects.all()
		serializer = ProductSerializer(products, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

	def test_create_product_successfull(self):
		"""Test create a new product just by staff"""
		payload = {
			"product_name" : "lbaskordi",
			"product_brand" : "saqqez",
			"product_description" : "the best",
			"size" : "mediom",
			"supplier" : self.supplier.id,
			"category" : self.category.id
			}

		self.user.is_staff = True
		self.client.post(PRODUCTS_URL, payload)

		exists = Product.objects.filter(
			product_name=payload['product_name']
			).exists()
		self.assertTrue(exists)

	def test_create_product_invalid(self):
		"""Test creating invalid product fails just by staff"""
		payload = {"product_name" : ""}
		self.user.is_staff = True

		res = self.client.post(PRODUCTS_URL, payload)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
