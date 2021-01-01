from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Supplier

from product.serializers import SupplierSerializer


# -list is for listing suppliers
SUPPLIER_URL = reverse('product:supplier-list')


class PublicSupplierApiTests(TestCase):
	"""Test the publicly available Suppliers API"""

	def setUp(self):
		self.client = APIClient()

	def test_login_required(self):
		"""Test that login is required for retrieving suppliers"""
		res = self.client.get(SUPPLIER_URL)

		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateSupplierApiTests(TestCase):
	"""Test the authorized user suppliers API"""

	def setUp(self):
		self.user = get_user_model().objects.create_user(
			'test@sheracore.com',
			'password123'
			)
		self.client = APIClient()
		self.client.force_authenticate(self.user)

	def test_retrieve_suppliers(self):
		"""Test retrieving suppliers"""
		Supplier.objects.create(
		user=self.user,
		company_name='tshirt 15 khordad',
		type_good='catan'
		)
		Supplier.objects.create(
		user=self.user,
		company_name='tshirt tavlidisara',
		type_good='nakh'
		)
		res = self.client.get(SUPPLIER_URL)

		# supplier = Supplier.objects.all().order_by('-id')
		supplier = Supplier.objects.all().order_by('-company_name')
		# we using serializer to return all suppliers --> many=True used for retrieve all suppliers
		serializer = SupplierSerializer(supplier, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

	def test_suppliers_limited_to_user(self):
		"""Test that suppliers returned are for the authenticated user"""
		user2 = get_user_model().objects.create_user(
			'other@sheracore.com',
			'testpass'
			)
		Supplier.objects.create(user=user2, company_name='jeenwest',type_good='Lee')
		supplier = Supplier.objects.create(user=self.user, company_name='LC wikiki',type_good='Jacket')

		res = self.client.get(SUPPLIER_URL)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data), 1)
		self.assertEqual(res.data[0]['company_name'], supplier.company_name)