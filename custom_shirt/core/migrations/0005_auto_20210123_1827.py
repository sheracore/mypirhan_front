# Generated by Django 3.1.4 on 2021-01-23 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20210123_1804'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='url',
            field=models.URLField(max_length=100, null=True, unique=True),
        ),
    ]
