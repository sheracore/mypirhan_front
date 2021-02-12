from rest_framework import serializers

from core.models import (Shipper, DesignAppendCategory,
                         DesignAppend, OrderItem)


class ShipperSerializer(serializers.ModelSerializer):
    """Serializer for shipper object"""

    class Meta:
        model = Shipper
        fields = ('id', 'company_name')
        read_only_fields = ('id',)


class DesignAppendCategorySerializer(serializers.ModelSerializer):
    """Seializer for OrderItemAppendCategory object"""

    class Meta:
        model = DesignAppendCategory
        fields = ('id', 'type_name')
        read_only_fields = ("id",)


class DesignAppendSerializer(serializers.ModelSerializer):
    """Serializer for OrderItemAppend objects"""

    class Meta:
        model = DesignAppend
        fields = ('id', 'name', 'image', 'design_append_category',
                  'design_append_price_irr')
        read_only_fields = ('id',)


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem objects"""
    class Meta:
        model = OrderItem
        fields = '__all__'
        read_only_fields = ('id',)

    # def create(self, validated_data):
