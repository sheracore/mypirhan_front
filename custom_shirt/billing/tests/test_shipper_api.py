from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Shipper

from billing.serializers import ShipperSerializer



SHIPPER_URL = reverse('billing:shipper-list')


class PriveteShipperApiTest(TestCase):
	"""Private test on shipper api"""
	
	def setUp(self):
		self.client = APIClient()
		self.user = get_user_model().objects.create_user(
			'test@sheracore.com',
			'testpass'
			)
		self.client.force_authenticate(self.user)



	def test_retrieve_all_shippers(self):
		"""Test retriving shippers by loged in user"""
		Shipper.objects.create(
			company_name='Post',
			user=self.user
			)
		res = self.client.get(SHIPPER_URL)

		shipper = Shipper.objects.all().order_by('-company_name')
		serializer = ShipperSerializer(shipper, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

	def test_test_shipper_limited_to_user(self):
		"""Test that suppliers returned are for the authenticated user"""
		user2 = get_user_model().objects.create_user(
			'test2@sheracore.com',
			'testpass'
			)
		shipper = Shipper.objects.create(
			company_name='Post_user1',
			user=self.user
			)
		Shipper.objects.create(
			company_name='Post_user2',
			user=user2
			)

		res = self.client.get(SHIPPER_URL)

		self.assertTrue(len(res.data), 1)
		self.assertEqual(res.data[0]['company_name'], shipper.company_name)

	def test_crezate_shipper(self):
		"""Test creating shipper"""
		payload = {
		"company_name" : "Post Office",
		}
		res = self.client.post(SHIPPER_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)

	def test_create_shipper_invalid(self):
		"""Test creating a new supplier with invalid payload"""
		payload = {'company_name' : ''}
		res = self.client.post(SHIPPER_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
