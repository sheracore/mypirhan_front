from django.test import TestCase
from app.calc import add, sub


class CalcTests(TestCase):
	
	def setUp(self):
		pass
 
	def test_add_numbers(self):
		"""Test that two numbers are added together"""
		self.assertEqual(add(6,5),11)

	def test_subtract_numbers(self):
		"""Test that two numberts are subtract together"""
		self.assertEqual(sub(6,5),1)