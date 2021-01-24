import io

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from PIL import Image

from core.models import OrderItemAppend, OrderItemAppendCategory

from billing.serializers import OrderItemAppendSerializer


ORDERITEMAPPEND_URL = reverse('billing:orderitemappend-list')


def generate_photo_file(file_name):
    file = io.BytesIO()
    image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = file_name
    file.seek(0)
    return file


def orderitemappendcategoroy_sample(type_name='Sport'):
    return OrderItemAppendCategory.objects.create(
        type_name=type_name
    )


class PublicOrderItemAppendApiTest(TestCase):
    """Public test on OrderItemAppend api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )

    def test_retrieve_order_item_append(self):
        """Test retrieving order item appends"""
        orderitemappendcategoroy = orderitemappendcategoroy_sample()
        OrderItemAppend.objects.create(
            name='Messi',
            order_item_append_category=orderitemappendcategoroy
        )
        OrderItemAppend.objects.create(
            name='Crisriano',
            order_item_append_category=orderitemappendcategoroy
        )

        res = self.client.get(ORDERITEMAPPEND_URL)

        orderitemappend = OrderItemAppend.objects.all().order_by('-name')
        serializer = OrderItemAppendSerializer(orderitemappend, many=True)

        self.assertEqual(res.data, serializer.data)


class PriveteOrderItemAppendApi(TestCase):
    """Public test on OrderItemAppend api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_create_order_item_append(self):
        """Test create order item append"""
        self.user.is_staff = True
        orderitemappendcategoroy = orderitemappendcategoroy_sample()
        image = generate_photo_file('image1.png')
        payload = {
            "name": 'messi_test',
            "order_item_append_category": orderitemappendcategoroy.id,
            "image": image
        }
        res = self.client.post(ORDERITEMAPPEND_URL, payload)

        exist = OrderItemAppend.objects.filter(
            name=payload["name"]).exists()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(exist)

    def test_create_order_item_append_invalid(self):
        """Test creating a new orderitemappend with invalid payload"""
        self.user.is_staff = True
        payload = {'name': ''}
        res = self.client.post(ORDERITEMAPPEND_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
