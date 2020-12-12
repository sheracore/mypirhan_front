from django.test import TestCase
from django.contrib.auth import get_user_model

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

    def test_new_user_normalize(self):
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



