# Generated by Django 3.1.3 on 2020-11-27 23:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('flatpages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StaticPage',
            fields=[
                ('flatpage_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='flatpages.flatpage')),
                ('meta_description', models.TextField(max_length=200)),
            ],
            options={
                'ordering': ['url'],
            },
            bases=('flatpages.flatpage',),
        ),
    ]
