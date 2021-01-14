from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from user import views


app_name='user'
#...

urlpatterns = [
	path('api-token-auth/', obtain_jwt_token),
	path('api-token-refresh/', refresh_jwt_token),
	path('api-token-verify/', verify_jwt_token),
	path('create/', views.CreateUserView.as_view(), name='create'),
	path('token/', views.CreateTokenView.as_view(), name='token'),
	path('me/', views.ManageUserView.as_view(), name='me'),
]