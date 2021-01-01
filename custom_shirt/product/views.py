from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Supplier

from product.serializers import SupplierSerializer



class SupplierViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
	"""Manage Supplier in the database"""
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	queryset = Supplier.objects.all()
	serializer_class = SupplierSerializer

	def get_queryset(self):
		"""Return objects for the current authenticated user only"""
		return self.queryset.filter(user=self.request.user).order_by('-company_name')
