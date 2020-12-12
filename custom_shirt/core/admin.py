from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from core import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext as _



""" This class creted for updating admin for support custom user model"""

class CustomUserAdmin(UserAdmin):
	ordering = ['id']
	list_display = ['email', 'name']
	fieldsets = (
		 (None, {'fields': ('email', 'password')}),
		 (_('Personal Info'), {'fields': ('name',)}),
		 (_
			 ('Permissions'),
			 {'fields': ('is_active', 'is_staff', 'is_superuser')}),
		 (_('Important dates'), {'fields': ('last_login',)})
		)
	# It was from django doc's and no more explain
	add_fieldsets = (
		 (None, {
			'classes': ('wide',),
			'fields': ('email', 'password1', 'password2')
		 }),
		)



# admin.site.register(get_user_model(), CustomUserAdmin)
