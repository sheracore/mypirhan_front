from rest_framework.permissions import BasePermission
from rest_framework.authentication import TokenAuthentication

class ProductPermission(BasePermission):

	def has_permission(self, request, view):
		if view.action == 'create':
			return request.user.is_authenticated and request.user.is_staff
		elif view.action in ['retrieve', 'list']:
			return True
		else:
			return False

	# remained : ['update', 'partial_update', 'destroy']


	# Deny actions on objects if the user is not authenticated		
	# def has_object_permission(self, request, view, obj):
	# 	print(obj.data,"*******8")
	# 	return True
		# return request.user.is_staff or obj.user.id == request.user.id
		# if not request.user.is_authenticated():
		#     return False
		# if view.action == 'retrieve':
		#     return obj == request.user or request.user.is_admin
		# elif view.action in ['update', 'partial_update']:
		#     return request.user.is_admin
		# else:
		#     return False

class CategoryPermission(BasePermission):

	def has_permission(self, request, view):
		if view.action == 'create':
			return request.user.is_authenticated and request.user.is_staff
		elif view.action in ['retrieve', 'list']:
			return True
		else:
			return False

	# def has_object_permission(self, request, view, obj):
	# 	"""
	# 	Return `True` if permission is granted, `False` otherwise.
	# 	"""
	# 	print(obj.categoty_type, "*_*_*_*_*_*")
	# 	return True
