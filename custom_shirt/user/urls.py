from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token

from user import views


app_name='user'
#...

urlpatterns = [
	path('create/', views.CreateUserView.as_view(), name='create'),
	path('token/', views.CreateTokenView.as_view(), name='token'),
	path('me/', views.ManageUserView.as_view(), name='me'),
	path('api-token-auth/', obtain_jwt_token),
	path('api-token-refresh/', refresh_jwt_token)
]