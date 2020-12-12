from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse


class AdminTest(TestCase):
	
	def setUp(self):
		self.client = Client()
		self.superuser = get_user_model().objects.create_superuser(
			'admin@sheracore.com',
			'test123'
			)
		self.client.force_login(self.superuser)
		self.user = get_user_model().objects.create_user(
			email='test@sheracore.com',
			password='test321',
			name='sheracore'
			)

	def test_user_listed(self):
		"""test that users are listed on user page"""
		url = reverse('admin:core_user_changelist')
		res = self.client.get(url)
		"""assertContains is a django custom assertion
		that will check our response of cantain a certain item
		response of http response with 200 """
		self.assertContains(res, self.user.name)
		self.assertContains(res, self.user.email)



