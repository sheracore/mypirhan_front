# Generated by Django 3.1.4 on 2021-01-26 19:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_auto_20210126_1848'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='total',
            new_name='total_price',
        ),
    ]
