from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APIClient

from billing.serializers import OrderSerializer

from core.models import Order, Customer


ORDER_URL = reverse('billing:order-list')


class PrivateOrderApiTest(TestCase):
    """private test on Order Api"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            "sheracore@shera.com",
            "testpass"
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)
        self.customer = Customer.objects.create(
            user=self.user,
            first_name="Mohamad",
            last_name="Ghaffari",
            address1="Tehran-haftetir",
            address2="Tehran-haftetir2",
            phone="09107829251",
            age=26
        )

    def test_retrive_order_list(self):
        """test retrieving a list of orders"""
        Order.objects.create(
            customer_id=self.customer.id,
            shipper_date=timezone.now(),
            paid_datetime=timezone.now(),
            first_name=self.customer.first_name,
            last_name=self.customer.last_name,
            address1=self.customer.address1,
            address2=self.customer.address2,
            phone=self.customer.phone,
            age=self.customer.age,
            paid=False
        )

        res = self.client.get(ORDER_URL)

        order = Order.objects.all()
        serializer = OrderSerializer(order, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data, res.data)

    def test_create_order(self):
        """Test create order"""
        payload = {
            "shipper_date": timezone.now(),
            "paid_datetime": timezone.now(),
            "first_name": self.customer.first_name,
            "last_name": self.customer.last_name,
            "address1": self.customer.address1,
            "address2": self.customer.address2,
            "phone": self.customer.phone,
            "age": self.customer.age,
            "paid": True
        }
        res = self.client.post(ORDER_URL, payload)
        exists = Order.objects.filter(
            first_name=payload["first_name"]).exists()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(exists)

    def test_create_order_invalid(self):
        """Test creating invalid order"""
        payload = {"first_name": ""}

        res = self.client.post(ORDER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
