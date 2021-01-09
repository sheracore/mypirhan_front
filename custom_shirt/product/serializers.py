from rest_framework import serializers
from core.models import Supplier, Product, Category


class SupplierSerializer(serializers.ModelSerializer):
	"""Serializer for Supplier objects"""

	class Meta:
		model = Supplier
		fields = ('id','company_name', 'type_good', 'discount_type', 'url')
		read_only_fields = ('id',)


class ProductSerializer(serializers.ModelSerializer):
	"""Serializer for products objects"""

	class Meta:
		model = Product
		fields = '__all__'
		read_only_fields = ('id',)

class CategorySerializer(serializers.ModelSerializer):
	"""Serializer for Categorys objects"""

	class Meta:
		model = Category
		fields = ("id", "category_type")
		read_only_fields = ('id',)