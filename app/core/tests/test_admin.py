from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse


class AdminSiteTests(TestCase):

	def setUp(self):
		self.client = Client()
		self.admin_user = get_user_model().objects.create_superuser(
			email='admin@sheracore.com',
			password='password123',
			)
		self.client.force_login(self.admin_user)
		self.user = get_user_model().objects.create_user(
			email='test@sheracore.com',
			password='password123',
			name='Test user full name'
			)

	def test_users_listed(self):
		"""Test that users are listed on uesr page"""
		url = reverse('admin:core_user_changelist')
		res = self.client.get(url)

		self.assertContains(res, self.user.name)
		self.assertContains(res, self.user.email)
		
