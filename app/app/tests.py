from django.test import TestCase
from app.calc import add


class CalcTests(TestCase):
	
	def setUp(self):
		pass
 
	def test_add_numbers(self):
		"Test that two numbers are added together"
		self.assertEqual(add(6,5),11)