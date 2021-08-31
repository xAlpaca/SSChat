import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from asgiref.sync import async_to_sync
from asgiref.sync import sync_to_async
from channels.generic.websocket import WebsocketConsumer

from .models import message, chats

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        _message = text_data_json['message']

        print(text_data_json)

        print(self.room_name)
        lines = _message.splitlines()
        await self.add_message(lines, self.room_name)


        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': _message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def add_message(self, lines, group):
        for i in lines:
            if i == "" or i == " ":
                continue
            __message = chats()
            __message.text = i
            __message.room = group
            __message.save()
            print('added message to db')
