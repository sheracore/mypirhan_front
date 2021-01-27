from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import DesignAppendCategory

from billing.serializers import DesignAppendCategorySerializer


ORDERITEMAPPENDCATEGORY_URL = reverse('billing:designappendcategory-list')


class PublicDesignAppendCategoryApiTest(TestCase):
    """Private test on DesignAppendCategory api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )

    def test_retrieve_degin_append_categories(self):
        """Test retriving OrderItemAppendCategories"""
        DesignAppendCategory.objects.create(
            type_name='sport_test',
        )
        DesignAppendCategory.objects.create(
            type_name='Art_test',
        )
        res = self.client.get(ORDERITEMAPPENDCATEGORY_URL)

        design_append_category = DesignAppendCategory.objects.all().order_by('-type_name')
        serializer = DesignAppendCategorySerializer(
            design_append_category, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


class PrivateDesignAppendCategoryApiTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@sheracore.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_create_design_append_category(self):
        """Test creating DesignAppendCategory"""
        payload = {
            "type_name": "Logo test",
        }
        self.user.is_staff = True

        res = self.client.post(ORDERITEMAPPENDCATEGORY_URL, payload)
        exist = DesignAppendCategory.objects.filter(
            type_name=payload["type_name"]).exists()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(exist)

    def test_create_design_append_category_invalid(self):
        """Test creating a new order item append category with invalid payload"""
        self.user.is_staff = True
        payload = {'type_name': ''}
        res = self.client.post(ORDERITEMAPPENDCATEGORY_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
