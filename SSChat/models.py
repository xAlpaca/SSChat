from django.db import models


class message(models.Model):
    text = models.TextField(max_length=3000000, blank=True, null=True, default='')
    room = models.TextField(max_length=3000000, blank=True, null=True, default='')
    time = models.TimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    date = models.DateField(auto_now_add=False, blank=True, null=True)
    seed = models.TextField(max_length=3000000, blank=True, null=True, default='')
    field_name = models.ImageField(upload_to='images', height_field=None, width_field=None, max_length=100, null=True, blank=True)
