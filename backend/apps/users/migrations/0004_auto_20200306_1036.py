# Generated by Django 3.0.4 on 2020-03-06 10:36

from django.db import migrations

from apps.users import models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200306_0743'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', models.UserManager()),
            ],
        ),
    ]
