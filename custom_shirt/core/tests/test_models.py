from unittest.mock import patch

from django.test import TestCase
from django.contrib.auth import get_user_model

from core.models import (
    Supplier,
    Product,
    Category,
    Shipper,
    Customer,
    DesignAppendCategory,
    DesignAppend,
    product_image_file_path,
    OrderItem,

)


def sample_user(email='test@sheracore.com', password='testpass'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


def sample_supplier():
    """Create a sample supplier"""
    return Supplier.objects.create(
        user=sample_user(),
        company_name='Pirahansara',
        url='http://www.pirahansara.com',
        type_good='Tshirt',
        discount_type="percent"
    )


def sample_category():
    """Create a sample category"""
    return Category.objects.create(
        category_type='Tshirt',
    )


# def sample_design():
#     """Create sample design object"""
#     return OrderItem.objects.create(
#         quantity=4,
#         product_brand="LCWikiki",
#         product_name="Jazb",
#         product_description="boland va shik va majlesi",
#         price_irr=250000,
#         total_price_irr=1000000,
#         size='Xlarg',
#         color='white',
#         weight_gram=120,
#         product_image_url="uploads/product/0f316069-46b0-4a62-b013-e9b79a505f96.png"
#     )


class ModelTest(TestCase):

    def test_create_user_with_email_successfull(self):
        """Test creating a new user with an email is successful"""
        email = 'test@sheracore.com'
        password = 'test123'

        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalize(self):
        """Test the new email for new user is normalize"""
        email = 'test@sheracore.COM'
        user = get_user_model().objects.create_user(email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test new uesr with no email raising error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test123')

    def test_create_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'admin@sheracore.com',
            'test123'
        )

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_supplier_str(self):
        """Test the supplier srting representation"""
        supplier = Supplier.objects.create(
            user=sample_user(),
            company_name='Pirahansara',
            url='http://www.pirahansara.com',
            type_good='Tshirt',
            discount_type="percent",
        )
        self.assertEqual(str(supplier), supplier.company_name)

    def test_create_supplier(self):
        """Test create a sample supplier"""
        company_name = 'Pirahansara'
        url = 'http://www.pirahansara.com'
        type_good = 'Tshirt'
        discount_type = "percent"

        supplier = Supplier.objects.create(
            user=sample_user(),
            company_name=company_name,
            url=url,
            type_good=type_good,
            discount_type=discount_type
        )
        self.assertEqual(supplier.company_name, company_name)

    def test_product_str(self):
        """Test the product string representation"""
        product = Product.objects.create(
            supplier=sample_supplier(),
            category=sample_category(),
            product_brand="LCWikiki",
            product_name="Jazb",
            product_description="boland va shik va majlesi",
            product_available=True,
            discount_available=True,
            price_irr=250000,
            discount=15,
            available_size=True,
            available_colors=True,
            size='Xlarg',
            color='white',
            weight_gram=0.2,
            units_in_stock=200,
            units_on_order_per_day=20,
            rainking=4.5,
            note="Its greate",
        )

        self.assertEqual(str(product), product.product_name)

    def test_category_str(self):
        """Test the category string representation"""
        category = Category.objects.create(
            category_type='Tshit',
        )

        self.assertEqual(str(category), category.category_type)

    def test_shipper_str(self):
        """Test the shipper string representation"""
        payload = {"company_name": "Post office"}
        shipper = Shipper.objects.create(
            user=sample_user(),
            company_name=payload["company_name"]
        )
        self.assertEqual(str(shipper), payload["company_name"])

    def test_customer_str(self):
        """Test the customer string represenration"""
        payload = {
            "first_name": "mohammad",
            "last_name": "ghaffari",
            "address1": "تهران هفت تیر کوچه جار پلاک ۱۸ واحد ۱۲",
            "phone": "09187879251",
            "age": 25
        }
        customer = Customer.objects.create(
            user=sample_user(),
            first_name=payload["first_name"],
            last_name=payload["last_name"],
            address1=payload["address1"],
            phone=payload["phone"],
            age=payload["age"]
        )

        self.assertEqual(str(customer), payload["first_name"])

    def test_design_append_category_str(self):
        """Test the DesignAppend string representation"""
        payload = {
            "type_name": "sport"
        }
        design_append_category = DesignAppendCategory.objects.create(
            type_name=payload["type_name"]
        )

        self.assertEqual(str(design_append_category), payload["type_name"])

    def test_design_append_str(self):
        """Test design append string representation"""
        design_append_category = DesignAppendCategory.objects.create(
            type_name='Sport'
        )
        payload = {
            "name": "Messi",
            "design_append_price_irr": 10000
        }
        design_append = DesignAppend.objects.create(
            name=payload["name"],
            design_append_price_irr=payload["design_append_price_irr"],
            design_append_category=design_append_category
        )
        self.assertEqual(str(design_append), payload["name"])

    @patch('uuid.uuid4')
    def test_product_file_name_uuid(self, mock_uuid):
        """Test that image is saved in the correct locations"""
        uuid = 'test-uuid'
        # Overriding uuid to test-uuid
        mock_uuid.return_value = uuid
        file_path = product_image_file_path(None, 'myimage.jpg')

        exp_path = f'uploads/product/{uuid}.jpg'

        self.assertEqual(file_path, exp_path)

    def test_order_item(self):
        """Create order item when a purches occured"""
        product_name = "BillMir"
        order_item = OrderItem.objects.create(
            quantity=3,
            product_brand="LC",
            product_name=product_name,
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
        self.assertEqual(str(order_item), product_name)
