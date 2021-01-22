from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Customer

from product.serializers import CustomerSerializer


# -list is for listing customer
CUSTOMER_URL = reverse('product:customer-list')


class PublicCustomerApiTests(TestCase):
    """Test the publicly available customer API"""

    def setUp(self):
        self.client = APIClient()

    def test_retrieve_customer(self):
        """Test that login is required for retrieving customers"""

        res = self.client.get(CUSTOMER_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateCustomerApiTests(TestCase):
    """Test the authorized user for customer API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'password123'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_customer(self):
        """Test retrieving customer"""
        Customer.objects.create(
            user=self.user,
            first_name="mohammad",
            last_name="ghaffari",
            address1="تهران هفت تیر کوچه جار پلاک ۱۸ واحد ۱۲",
            phone="09187879251",
            age=26
        )
        res = self.client.get(CUSTOMER_URL)

        customer = Customer.objects.all().order_by('-first_name')
        # we using serializer to return  customer --> many=True
        # used for retrieve all customer
        serializer = CustomerSerializer(customer, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_customer_limited_to_user(self):
        """Test that customer returned are for the authenticated user"""
        user2 = get_user_model().objects.create_user(
            'other@sheracore.com',
            'testpass'
        )
        Customer.objects.create(
            user=user2,
            first_name="mehran",
            last_name="ghaffari",
            address1="تهران هفت تیر کوچه جار پلاک ۱۸ واحد ۱۲",
            phone="09184148625",
            age=20)
        customer = Customer.objects.create(
            user=self.user,
            first_name="mohammad",
            last_name="ghaffari",
            address1="تهران هفت تیر کوچه جار پلاک ۱۸ واحد ۱۲",
            phone="09187879251",
            age=20)

        res = self.client.get(CUSTOMER_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['first_name'], customer.first_name)

    def test_create_customer_successful(self):
        """Test creating a new customer"""
        payload = {
            "first_name":  "mohammad",
            "last_name": "ghaffari",
            "address1": "تهران هفت تیر کوچه جار پلاک ۱۸ واحد ۱۲",
            "phone": "09107829251",
            "age": 26
        }
        res = self.client.post(CUSTOMER_URL, payload)

        customer_exist = Customer.objects.filter(
            user=self.user,
            first_name=payload['first_name']
        ).exists()

        self.assertTrue(customer_exist)

    def test_create_customer_invalid(self):
        """Test creating a new customer with invalid payload"""
        payload = {'firts_name': ''}
        res = self.client.post(CUSTOMER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
