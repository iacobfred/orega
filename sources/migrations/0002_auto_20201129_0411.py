# Generated by Django 3.1.3 on 2020-11-29 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='date_is_circa',
            field=models.BooleanField(blank=True, default=False, verbose_name='date is circa'),
        ),
    ]
