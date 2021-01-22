from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import OrderItemAppendCategory

from billing.serializers import OrderItemAppendCategorySerializer


ORDERITEMAPPENDCATEGORY_URL = reverse('billing:orderitemappendcategory-list')


class PublicOrderItemAppendCategoryApiTest(TestCase):
    """Private test on OrderItemAppendCategory api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )

    def test_retrieve_all_OrderItemAppendCategories(self):
        """Test retriving OrderItemAppendCategories"""
        OrderItemAppendCategory.objects.create(
            type_name='sport_test',
        )
        OrderItemAppendCategory.objects.create(
            type_name='Art_test',
        )
        res = self.client.get(ORDERITEMAPPENDCATEGORY_URL)

        order_item_append_category = OrderItemAppendCategory.objects.all().order_by('-type_name')
        serializer = OrderItemAppendCategorySerializer(
            order_item_append_category, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


class PrivateOrderItemAppendCategoryApiTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def order_item_append_category(self):
        """Test creating OrderItemAppendCategory"""
        payload = {
            "type_name": "Logo test",
        }
        self.user.is_staff = True

        res = self.client.post(ORDERITEMAPPENDCATEGORY_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_order_item_append_category_invalid(self):
        """Test creating a new supplier with invalid payload"""
        self.user.is_staff = True
        payload = {'type_name': ''}
        res = self.client.post(ORDERITEMAPPENDCATEGORY_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
