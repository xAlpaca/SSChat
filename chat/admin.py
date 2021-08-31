from django.contrib import admin
from .models import  message, chats, chat_messages

# Register your models here.

admin.site.register(message)
admin.site.register(chats)
admin.site.register(chat_messages)
