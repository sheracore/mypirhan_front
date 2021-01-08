from rest_framework import serializers
from core.models import Supplier, Product


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