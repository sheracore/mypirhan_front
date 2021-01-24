from django.contrib import admin
from core import models

# from django.contrib.auth.admin import UserAdmin
# from django.contrib.auth import get_user_model
# from django.utils.translation import gettext as _


""" This class creted for updating admin for support custom user model"""


class CustomUserAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['email', 'name']
    # fieldsets = (
    # 	 (None, {'fields': ('email', 'password')}),
    # 	 (_('Personal Info'), {'fields': ('name',)}),
    # 	 (_
    # 		 ('Permissions'),
    # 		 {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    # 	 (_('Important dates'), {'fields': ('last_login',)})
    # 	)
    # # It was from django doc's and no more explain
    # add_fieldsets = (
    # 	 (None, {
    # 		'classes': ('wide',),
    # 		'fields': ('email', 'password1', 'password2')
    # 	 }),
    # 	)


admin.site.register(models.User, CustomUserAdmin)
admin.site.register(models.Supplier)
admin.site.register(models.Product)
admin.site.register(models.Category)
admin.site.register(models.Shipper)
admin.site.register(models.Customer)
admin.site.register(models.OrderItemAppendCategory)
admin.site.register(models.OrderItemAppend)
