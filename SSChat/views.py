import secrets
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import message
from .forms import MessageForm
from django.views.decorators.csrf import csrf_exempt
import json
from ratelimit.decorators import ratelimit
import os

def index(request):
    return render(request, 'SSChat/index.html')

def room(request, room_name):
    vars= {"roomName": room_name}

    messages = message.objects.filter(room=room_name)
    vars["messages"] = messages.values()
    vars["room_name"] = room_name
    # print(vars["messages"])



    return render(request, 'SSChat/room.html', vars)

@csrf_exempt
def room_get(request, room_name):
    messages = message.objects.filter(room=room_name)
    msgs = {}
    for id, msg in enumerate(messages):
        msgs[id] = {0: msg.text, 1: str(msg.time), 2: str(msg.date), 3: str(msg.seed), 4: str(msg.field_name)}


    return JsonResponse(msgs)

@csrf_exempt
def room_get_amount(request, room_name, amount):
    messages = message.objects.filter(room=room_name)
    msgs = {id: {0: msg.text, 1: str(msg.time), 2: str(msg.date), 3: str(msg.seed), 4: str(msg.field_name)} for id, msg in enumerate(messages)}

    for i in range(messages.count()-amount):
        del(msgs[i])

    _msgs = {id : {0: msgs[index_d][0], 1: msgs[index_d][1], 2: msgs[index_d][2], 3: msgs[index_d][3], 4: msgs[index_d][4]} for id, index_d in enumerate(msgs)}



    return JsonResponse(_msgs)




@csrf_exempt
def room_post(request, room_name):
    if request.method == "POST":

        _message = message()
        _message.room = room_name
        _message.text = request.POST.get("text")
        print(_message.text)
        if request.POST.get("time") != "":
            _message.time = request.POST.get("time")
        if request.POST.get("date") != "":
            _message.date = request.POST.get("date")
        _message.seed = secrets.token_urlsafe(32)
        if request.FILES.get("file") != None:
            _message.field_name = request.FILES.get("file")
        _message.field_name = request.FILES.get('file')

        _message.save()

    return HttpResponse("OK")


@csrf_exempt
def room_get_last(request, room_name):
    last_one = message.objects.filter(room=room_name).last()

    msgs = {0: last_one.text, 1: str(last_one.time), 2: str(last_one.date), 3: str(last_one.seed)}

    return JsonResponse(msgs)

@csrf_exempt
def room_delete_message(request, room_name):
    if request.method == "POST":

        token = request.POST.get("seed")
        print("ok")
        print(token)
        messages = message.objects.filter(seed=token)

        for i in messages:
            print(i.text)
            if i.room == room_name:
                i.delete()
    return HttpResponse()


@csrf_exempt
@ratelimit(key='ip', rate='600/h', block=True)
def room_delete_all_messages(request, room_name):
    # if request.method == "POST":
    messages = message.objects.filter(room=room_name)
    for i in messages:
        i.delete()
    return HttpResponse()


