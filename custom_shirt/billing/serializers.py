from rest_framework import serializers

from core.models import Shipper, OrderItemAppendCategory, OrderItemAppend


class ShipperSerializer(serializers.ModelSerializer):
    """Serializer for shipper object"""

    class Meta:
        model = Shipper
        fields = ('id', 'company_name')
        read_only_fields = ('id',)


class OrderItemAppendCategorySerializer(serializers.ModelSerializer):
    """Seializer for OrderItemAppendCategory object"""

    class Meta:
        model = OrderItemAppendCategory
        fields = ('id', 'type_name')
        read_only_fields = ("id",)


class OrderItemAppendSerializer(serializers.ModelSerializer):
    """Serializer for OrderItemAppend objects"""

    class Meta:
        model = OrderItemAppend
        fields = ('id', 'name', 'image', 'order_item_append_category',
                  'order_item_append_price_irr')
        read_only_fields = ('id',)
