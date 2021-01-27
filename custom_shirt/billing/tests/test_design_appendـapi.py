import io

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from PIL import Image

from core.models import DesignAppend, DesignAppendCategory

from billing.serializers import DesignAppendSerializer


DESIGNAPPEND_URL = reverse('billing:designappend-list')


def generate_photo_file(file_name):
    file = io.BytesIO()
    image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = file_name
    file.seek(0)
    return file


def designappendcategoroy_sample(type_name='Sport'):
    return DesignAppendCategory.objects.create(
        type_name=type_name
    )


class PublicOrderItemAppendApiTest(TestCase):
    """Public test on DesignAppend api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )

    def test_retrieve_design_append(self):
        """Test retrieving order item appends"""
        designappendcategoroy = designappendcategoroy_sample()
        DesignAppend.objects.create(
            name='Messi',
            design_append_price_irr=10000,
            design_append_category=designappendcategoroy
        )
        DesignAppend.objects.create(
            name='Crisriano',
            design_append_price_irr=10000,
            design_append_category=designappendcategoroy
        )

        res = self.client.get(DESIGNAPPEND_URL)

        designappend = DesignAppend.objects.all().order_by('-name')
        serializer = DesignAppendSerializer(designappend, many=True)

        self.assertEqual(res.data, serializer.data)


class PriveteDesignAppendApi(TestCase):
    """Public test on DesignAppend api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_create_design_append(self):
        """Test create order item append"""
        self.user.is_staff = True
        designappendcategoroy = designappendcategoroy_sample()
        image = generate_photo_file('image1.png')
        payload = {
            "name": 'messi_test',
            "design_append_category": designappendcategoroy.id,
            "design_append_price_irr": 10000,
            "image": image
        }
        res = self.client.post(DESIGNAPPEND_URL, payload)

        exist = DesignAppend.objects.filter(
            name=payload["name"]).exists()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(exist)

    def test_create_design_append_invalid(self):
        """Test creating a new orderitemappend with invalid payload"""
        self.user.is_staff = True
        payload = {'name': ''}
        res = self.client.post(DESIGNAPPEND_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
