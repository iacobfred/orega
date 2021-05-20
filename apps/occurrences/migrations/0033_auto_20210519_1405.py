# Generated by Django 3.1.9 on 2021-05-19 14:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postulations', '0024_delete_occurrencefactrelation'),
        ('sources', '0017_remove_source_related'),
        ('topics', '0004_remove_topic_related'),
        ('quotes', '0040_remove_quote_related'),
        ('occurrences', '0032_auto_20210518_1727'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='occurrenceentityinvolvement',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='occurrenceentityinvolvement',
            name='entity',
        ),
        migrations.RemoveField(
            model_name='occurrenceentityinvolvement',
            name='occurrence',
        ),
        migrations.AlterUniqueTogether(
            name='occurrenceimage',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='occurrenceimage',
            name='image',
        ),
        migrations.RemoveField(
            model_name='occurrenceimage',
            name='occurrence',
        ),
        migrations.AlterUniqueTogether(
            name='occurrencelocation',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='occurrencelocation',
            name='location',
        ),
        migrations.RemoveField(
            model_name='occurrencelocation',
            name='occurrence',
        ),
        migrations.AlterField(
            model_name='occurrencechaininclusion',
            name='occurrence',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='chain_inclusions',
                to='occurrences.newoccurrence',
            ),
        ),
        migrations.DeleteModel(
            name='Occurrence',
        ),
        migrations.DeleteModel(
            name='OccurrenceEntityInvolvement',
        ),
        migrations.DeleteModel(
            name='OccurrenceImage',
        ),
        migrations.DeleteModel(
            name='OccurrenceLocation',
        ),
    ]
