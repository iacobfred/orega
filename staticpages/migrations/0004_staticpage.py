# Generated by Django 3.0.7 on 2020-08-25 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('flatpages', '0001_initial'),
        ('staticpages', '0003_delete_staticpage'),
    ]

    operations = [
        migrations.CreateModel(
            name='StaticPage',
            fields=[
                ('flatpage_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='flatpages.FlatPage')),
                ('meta_description', models.TextField(max_length=200)),
            ],
            options={
                'ordering': ('url',),
            },
            bases=('flatpages.flatpage',),
        ),
    ]
