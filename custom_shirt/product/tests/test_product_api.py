from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import force_authenticate, APIClient
from rest_framework import status

from core.models import Product, Supplier

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

	def test_retrieve_products_list(self):
		"""Test retrieving a list of proructs"""		
		Product.objects.create(
			supplier=self.supplier,
			product_name="short",
			)
		Product.objects.create(
			supplier=self.supplier,
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



	# def test_products_limited_to_supplier(self):
	# 	"""Test that products for the """
	# 	supplier2 = Supplier.objects.creaete(user=self.user)

	# 	Product.objects.create(supplier=supplier2, product_name="mask")
	# 	product = Product.objects.get(supplier=self.supplier, product_name="Mug")

	# 	res = self.client.get(PRODUCTS_URL)

	# 	self.assertEqual(res.status_code, status.HTTP_200_OK)
	# 	self.assertEqual(len(res.data), 1)
	# 	self.assertEqual(res.data[0]["name"], product.name)
