# Generated by Django 3.2.7 on 2021-10-22 04:02

import django.db.models.deletion
from django.db import migrations, models

import core.fields.m2m_foreign_key


class Migration(migrations.Migration):

    dependencies = [
        ('collections', '0006_collection_quotes'),
        ('sources', '0016_auto_20210824_1528'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollectionInclusion',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                (
                    'collection',
                    core.fields.m2m_foreign_key.ManyToManyForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='sources_collectioninclusion_set',
                        to='collections.collection',
                    ),
                ),
                (
                    'content_object',
                    core.fields.m2m_foreign_key.ManyToManyForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='collection_inclusions',
                        to='sources.source',
                        verbose_name='source',
                    ),
                ),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
