# Generated by Django 3.1.11 on 2021-05-22 18:37

from django.db import migrations

import core.fields
import core.fields.html_field


class Migration(migrations.Migration):

    dependencies = [
        ('sources', '0002_source_release'),
    ]

    operations = [
        migrations.AddField(
            model_name='source',
            name='content',
            field=core.fields.HTMLField(
                blank=True,
                help_text='Enter the content of the source (with ellipses as needed).',
                null=True,
                paragraphed=None,
                processed=True,
                processor=core.fields.html_field.process,
                verbose_name='content',
            ),
        ),
    ]
