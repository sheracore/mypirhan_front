# Generated by Django 3.1.4 on 2021-01-04 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='url',
            field=models.URLField(max_length=100, null=True, unique=True),
        ),
    ]