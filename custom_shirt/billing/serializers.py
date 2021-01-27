from rest_framework import serializers

from core.models import Shipper, DesignAppendCategory, DesignAppend


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
        fields = ('id', 'name', 'image', 'order_item_append_category',
                  'order_item_append_price_irr')
        read_only_fields = ('id',)