from rest_framework.permissions import BasePermission


class OrderItemAppendCategoryPermissions(BasePermission):
    """Create permissions for OrderItemAppendCategory"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        if view.action in ['create', 'destroy', 'partial_update', 'update']:
            return request.user and request.user.is_authenticated and request.user.is_staff

        elif view.action in ['retrieve', 'list']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return True


class OrderItemAppendPermissions(BasePermission):
    """Creare permissions for OrderItemAppend"""

    def has_permission(self, request, view):
        if view.action in ['create', 'destroy', 'partial_update', 'update']:
            return request.user and request.user.is_authenticated and request.user.is_staff

        elif view.action in ['retrieve', 'list']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return True
