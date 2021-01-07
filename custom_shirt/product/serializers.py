from rest_framework import serializers
from core.models import Supplier


class SupplierSerializer(serializers.ModelSerializer):
	"""Serializer for Supplier objects"""

	class Meta:
		model = Supplier
		fields = ('id','company_name', 'type_good', 'discount_type', 'url')
		read_only_fields = ('id',)