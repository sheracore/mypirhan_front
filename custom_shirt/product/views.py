from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Supplier, Product

from product.serializers import SupplierSerializer, ProductSerializer



class SupplierViewSet(viewsets.GenericViewSet,
					 mixins.ListModelMixin,
					 mixins.CreateModelMixin):
	"""Manage Supplier in the database"""
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	queryset = Supplier.objects.all()
	serializer_class = SupplierSerializer

	def get_queryset(self):
		"""Return objects for the current authenticated user only"""
		return self.queryset.filter(user=self.request.user).order_by('-company_name')

	def perform_create(self, serializer):
		"""Create a new supplier"""
		# Set the user to the authenticated user 
		serializer.save(user=self.request.user)

class ProductViewSet(viewsets.GenericViewSet,
					mixins.ListModelMixin):
	"""Manage Product in the database"""
	# authentication_classes = (TokenAuthentication,)
	# permission_classes = (IsAuthenticated,)
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

	





