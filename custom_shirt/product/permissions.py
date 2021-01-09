from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication

class ProductPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'create':
            print(request.user.is_authenticated,"**" ,request.user.is_staff)
            return request.user.is_authenticated and request.user.is_staff
        elif view.action in ['retrieve', 'update', 'partial_update', 'destroy', 'list']:
            return True
        else:
            return False

    # def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        # if not request.user.is_authenticated():
        #     return False
        # def has_object_permission(self, request, view, obj):
        #     return request.user.is_superuser or obj.user.id == request.user.id
        # if view.action == 'retrieve':
        #     return obj == request.user or request.user.is_admin
        # elif view.action in ['update', 'partial_update']:
        #     return request.user.is_admin
        # else:
        #     return False