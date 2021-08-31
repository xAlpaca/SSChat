from django.db import models

# Create your models here.

class message(models.Model):
    text = models.TextField(max_length=3000000, blank=True, null=True, default='')

class chats(models.Model):
    text = models.TextField(max_length=3000000, blank=True, null=True, default='')
    room = models.TextField(max_length=1024, blank=True, null=True, default='')


class chat_messages(models.Model):
    text = models.TextField(max_length=3000000, blank=True, null=True, default='')
    room = models.TextField(max_length=3000000, blank=True, null=True, default='')
    time = models.TimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    date = models.DateField(auto_now_add=False, blank=True, null=True)
    seed = models.TextField(max_length=3000000, blank=True, null=True, default='')


