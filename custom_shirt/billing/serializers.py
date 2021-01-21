from rest_framework import serializers

from core.models import Shipper


class ShipperSerializer(serializers.ModelSerializer):
	"""Serializer for shipper object"""

	class Meta:
		model = Shipper
		fields = ('id', 'company_name')
		read_only_fields = ('id',)