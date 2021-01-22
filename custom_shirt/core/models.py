from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# recommnded to retrieve setting from the django settings(custom_shit.setting)
from django.conf import settings


def product_image_file_path(instance, filename):
    """Generate file path for new recipe image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/recipe/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a new user"""
        if not email:
            raise ValueError("users most have an email address")

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create a superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    """Custom user model that suppors using email instead of username"""
    email = models.EmailField(max_length=64, unique=True)
    name = models.CharField(max_length=64, null=True)
    address1 = models.CharField(max_length=255, null=True)
    address2 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=64, default='Tehran', null=True)
    province = models.CharField(max_length=64, default='Tehran', null=True)
    postal_code = models.CharField(max_length=32, null=True)
    phone = models.CharField(max_length=11, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Supplier(models.Model):
    """Supplier to be used for products"""
    """Instead of reffrence user object directly that we could do
	   we ganna use best practice method to retrieving auth user model
	   setting from django settings"""
    company_name = models.CharField(max_length=64)
    type_good = models.CharField(max_length=64)
    discount_type = models.CharField(max_length=64, null=True, blank=True)
    url = models.URLField(max_length=100, null=True, unique=True, blank=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.company_name


class Category(models.Model):
    category_type = models.CharField(max_length=128, default='Tshirt')

    def __str__(self):
        return self.category_type


class Product(models.Model):
    """Supplier to be used for products"""
    """Instead of reffrence user object directly that we could do
	   we ganna use best practice method to retrieving auth user model
	   setting from django settings"""
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_brand = models.CharField(max_length=64)
    product_name = models.CharField(max_length=64)
    product_description = models.CharField(
        max_length=512, null=True, blank=True)
    product_available = models.BooleanField(default=True)
    discount_available = models.BooleanField(default=True)
    discount = models.FloatField(default=0.0)
    available_size = models.BooleanField(default=True)
    available_colors = models.BooleanField(default=True)
    size = models.CharField(max_length=64)
    color = models.CharField(max_length=64, default="No color")
    weight_gram = models.FloatField(null=True, blank=True)
    units_in_stock = models.IntegerField(null=True, blank=True)
    units_on_order_per_day = models.IntegerField(null=True, blank=True)
    picture = models.ImageField(
        null=True, blank=True, upload_to=product_image_file_path)
    rainking = models.FloatField(null=True, blank=True)
    note = models.CharField(max_length=512, null=True, blank=True)

    def __str__(self):
        return self.product_name


class Shipper(models.Model):
    """Shipper to transfer product to the customer"""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    company_name = models.CharField(max_length=64)

    def __str__(self):
        return self.company_name


class Customer(models.Model):
    """Customer created when purchase occured"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE
                                )
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, null=True)
    age = models.IntegerField(null=True)
    city = models.CharField(max_length=64, default='Tehran')
    province = models.CharField(max_length=64, default='Tehran')
    phone = models.CharField(max_length=11, unique=True)
    postal_code = models.CharField(max_length=32, null=True, blank=True)
    country = models.CharField(max_length=64, default='IRAN')

    def __str__(self):
        return self.first_name
