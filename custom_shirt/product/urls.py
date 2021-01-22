from django.urls import path, include
from rest_framework.routers import DefaultRouter

from product import views


router = DefaultRouter()

router.register('suppliers', views.SupplierViewSet)
router.register('products', views.ProductViewSet)
router.register('categories', views.CategoryViewSet)
router.register('customers', views.CustomerViewSet)

app_name = 'product'

urlpatterns = [
    path('', include(router.urls))
]
