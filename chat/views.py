import json
import time
import os
import random
import secrets

from websocket import create_connection
from django.shortcuts import render
from .models import chat_messages
import subprocess
from django.http import HttpResponse
from django.http import JsonResponse


import sys
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from websocket import create_connection
import asyncio


chats = chat_messages

# chats.objects.all().delete()

def index(request):
	vars = {}
	return render(request, "chat/index.html", vars)

def room(request, room_name):

	messages = chats.objects.filter(room=room_name)
	texts = []
	times = []
	seeds = []
	for i in messages:
		texts.append(i.text)
		times.append(str(i.time)+"//"+str(i.date))
		seeds.append(i.seed)


	last_lines = texts[-40:]
	time_values = times[-40:]
	seeds_values = seeds[-40:]
	vars = {
		"room_name": room_name,
		"messages": last_lines,
		"times": time_values,
		"seeds": seeds_values,
	}

	return render(request, "chat/room.html", vars)

def get_messages(request, room_name):
	messages = chats.objects.filter(room=room_name)

	texts = []

	for i in messages:
		texts.append(i.text)



	list = {}

	for i in range(len(messages)):
		list[i] = {0: messages[i].text, 1: str(messages[i].time), 2: str(messages[i].date), 3: str(messages[i].seed)}
	# print(list)

	return JsonResponse(list)

def post_message(request, room_name):
	if request.method == 'POST':
		text = request.POST.get("text")
		time1 = request.POST.get("time")
		date1 = request.POST.get("yr")
		seed = secrets.token_urlsafe(96)
		print(text)
		__message = chats()
		__message.text = text
		__message.room = room_name
		__message.time = time1
		__message.date = date1
		__message.seed = seed
		__message.save()
	return HttpResponse()

def delete_message(request, room_name):
	if request.method == "POST":
		token = request.POST.get("seed")
		print(request.POST)
		messages = chats.objects.filter(seed=token)
		for i in messages:
			print(i.text)
			if i.room == room_name:
				i.delete()



	return HttpResponse()
