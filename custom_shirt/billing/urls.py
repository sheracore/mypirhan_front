from django.urls import path, include

from rest_framework.routers import DefaultRouter

from billing import views


router = DefaultRouter()

router.register('shippers', views.ShipperViewSet)
router.register('orderitemappendcategory',
                views.OrderItemAppendCategoryViewSet)
router.register('orderitemappend', views.OrderItemAppendViewSet)

app_name = 'billing'

urlpatterns = [
    path('', include(router.urls))
]
