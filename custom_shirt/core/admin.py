from django.contrib import admin

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from core import models



""" This class creted for updating admin for support custom user model"""

class UserAdmin(BaseUserAdmin):
	ordering = ['id']
	list_display = ['email', 'name']


admin.site.register(models.User, UserAdmin)
