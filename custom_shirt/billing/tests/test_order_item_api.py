import io

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

from core.models import OrderItem, Supplier, Category
from billing.serializers import OrderItemSerializer

from PIL import Image


PRODUCTS_URL = reverse('product:product-list')
ORDERITEM_URL = reverse("billing:orderitem-list")


def generate_photo_file(file_name):
    file = io.BytesIO()
    image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
    image.save(file, 'png')
    file.name = file_name
    file.seek(0)
    return file


class PrivateOrderItemApiTest(TestCase):
    """private test on OrderItem Api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "shera@sheracore.com",
            "testpass"
        )
        self.client.force_authenticate(self.user)
        self.supplier = Supplier.objects.create(
            user=self.user,
            company_name='Pirhansara 16 xordad',
            type_good="Tshirt")
        self.category = Category.objects.create(category_type="Thirt")

    def test_retrieve_order_item_list(self):
        """test retrieving a list of order items"""
        OrderItem.objects.create(
            quantity=3,
            product_brand="LC",
            product_name="ghd",
            product_description="Aaliiii",
            # Its contain product price and orderitemappend price
            price_irr=250000,  # Product price
            # Total = quantity * price_irr + (total design append price)
            total_price_irr=750000,
            discount=4,
            size="Mediom",
            color="Yellow",
            weight_gram=300
        )
        OrderItem.objects.create(
            quantity=2,
            product_brand="Polo",
            product_name="qwe",
            product_description="Good",
            # Its contain product price and orderitemappend price
            price_irr=200000,  # Product price
            # Total = quantity * price_irr + (total design append price)
            total_price_irr=400000,
            discount=0,
            size="Mediom",
            color="White",
            weight_gram=100
        )
        res = self.client.get(ORDERITEM_URL)

        order_item = OrderItem.objects.all()
        serializer = OrderItemSerializer(order_item, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_order_item_successfull(self):
        """Test create order item when purchase occurred"""

        image_front_name = 'test_front.png'
        image_back_name = 'test_back.png'
        image_side_left_name = 'test_side_left.png'
        image_side_right_name = 'test_side_right.png'
        final_image_edited = 'final_image.png'
        image_front = generate_photo_file(image_front_name)
        image_back = generate_photo_file(image_back_name)
        image_side_left = generate_photo_file(image_side_left_name)
        image_side_right = generate_photo_file(image_side_right_name)
        final_image = generate_photo_file(final_image_edited)

        # payload_product = {
        #     "product_brand": "Polo",
        #     "product_name": "qwe",
        #     "product_description": "Good",
        #     "size": "Mediom",
        #     "price_irr": 200000,
        #     "image_front": image_front,
        #     "image_back": image_back,
        #     "image_side_left": image_side_left,
        #     "image_side_right": image_side_right,
        #     "supplier": self.supplier.id,
        #     "category": self.category.id
        # }
        # self.user.is_staff = True

        # res = self.client.post(PRODUCTS_URL, payload_product)
        # self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        # self.user.is_staff = False

        payload_order_item = {
            "quantity": 2,
            "product_brand": "Polo",
            "product_name": "qwetest",
            "product_description": "Its so good",
            # Its contain product price and orderitemappend price
            "price_irr": 200000,  # Product price
            # Total = quantity * price_irr + (total design append price)
            "total_price_irr": 400000,
            "size": "Mediom",
            "color": "White",
            "weight_gram": 100,
            "product_image_front": image_front,
            "product_image_back": image_back,
            "product_image_side_left": image_side_left,
            "product_image_side_right": image_side_right,
            "final_image": final_image,
        }

        res = self.client.post(ORDERITEM_URL, payload_order_item)

        exists = OrderItem.objects.filter(
            product_name=payload_order_item["product_name"]
        ).exists()

        self.assertTrue(exists)
