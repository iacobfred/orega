# Generated by Django 3.1.2 on 2020-10-31 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quotes', '0004_remove_quotebite_computations'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quoteimage',
            name='quote',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='image_relations', to='quotes.quote'),
        ),
    ]
