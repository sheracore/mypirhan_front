from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny

from billing.serializers import ShipperSerializer

from core.models import Shipper



class ShipperViewSet(viewsets.GenericViewSet,
					mixins.ListModelMixin,
					mixins.CreateModelMixin):
	"""Manage Shipper in the database"""
	permission_classes = (IsAuthenticated,)
	queryset = Shipper.objects.all()
	serializer_class = ShipperSerializer


	def get_queryset(self):
		return self.queryset.filter(user=self.request.user).order_by('-company_name')

	def perform_create(self, serializer):
		"""Create a new Shipper"""
		# Set the user to the authenticated user 
		serializer.save(user=self.request.user)

