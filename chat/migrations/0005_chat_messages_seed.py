# Generated by Django 3.1.3 on 2021-08-31 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_auto_20210828_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat_messages',
            name='seed',
            field=models.TextField(blank=True, default='', max_length=3000000, null=True),
        ),
    ]