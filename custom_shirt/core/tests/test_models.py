from django.test import TestCase
from django.contrib.auth import get_user_model

from core.models import Supplier


def sample_user(email='test@sheracore.com', password='testpass'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email,password)



class ModelTest(TestCase):

    def test_create_user_with_email_successfull(self):
        """Test creating a new user with an email is successful"""
        email = 'test@sheracore.com'
        password = 'test123'

        user = get_user_model().objects.create_user(
            email=email,
            password=password
            )
        self.assertEqual(user.email,email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalize(self):
    	"""Test the new email for new user is normalize"""
    	email = 'test@sheracore.COM'
    	user = get_user_model().objects.create_user(email,'test123')

    	self.assertEqual(user.email,email.lower())

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
            user = sample_user(),
            company_name = 'Pirahansara',
            url = 'www.pirahansara.com',
            type_good = 'Tshirt',
            discount_percent = 12,
            )
        self.assertEqual(str(supplier), supplier.company_name)

    # def test_supplier_str(self):
    #     """Test the tag string representation"""
    #     product = product.objects.create(
    #         supplier = 
    #         )



