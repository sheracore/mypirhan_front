# Generated by Django 3.1.4 on 2021-01-17 17:59

import core.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=64, unique=True)),
                ('name', models.CharField(max_length=64, null=True)),
                ('address1', models.CharField(max_length=255, null=True)),
                ('address2', models.CharField(max_length=255, null=True)),
                ('city', models.CharField(default='Tehran', max_length=64, null=True)),
                ('province', models.CharField(default='Tehran', max_length=64, null=True)),
                ('postal_code', models.CharField(max_length=32, null=True)),
                ('phone', models.CharField(max_length=11, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_type', models.CharField(default='Tshirt', max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=64)),
                ('type_good', models.CharField(max_length=64)),
                ('discount_type', models.CharField(blank=True, max_length=64, null=True)),
                ('url', models.URLField(blank=True, max_length=100, null=True, unique=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Shipper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(blank=True, max_length=64)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_brand', models.CharField(max_length=64)),
                ('product_name', models.CharField(max_length=64)),
                ('product_description', models.CharField(blank=True, max_length=512, null=True)),
                ('product_available', models.BooleanField(default=True)),
                ('discount_available', models.BooleanField(default=True)),
                ('discount', models.FloatField(default=0.0)),
                ('available_size', models.BooleanField(default=True)),
                ('available_colors', models.BooleanField(default=True)),
                ('size', models.CharField(max_length=64)),
                ('color', models.CharField(default='No color', max_length=64)),
                ('weight_gram', models.FloatField(blank=True, null=True)),
                ('units_in_stock', models.IntegerField(blank=True, null=True)),
                ('units_on_order_per_day', models.IntegerField(blank=True, null=True)),
                ('picture', models.ImageField(blank=True, null=True, upload_to=core.models.product_image_file_path)),
                ('rainking', models.FloatField(blank=True, null=True)),
                ('note', models.CharField(blank=True, max_length=512, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.category')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.supplier')),
            ],
        ),
    ]
