# Generated by Django 3.1.9 on 2021-05-19 17:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('propositions', '0024_auto_20210519_1511'),
    ]

    operations = [
        migrations.RenameField(
            model_name='proposition',
            old_name='computations',
            new_name='cache',
        ),
    ]
