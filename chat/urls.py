from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('<str:room_name>/', views.room, name="room"),
    path('<str:room_name>/get/', views.get_messages, name="get_messages"),
    path('<str:room_name>/post/', views.post_message, name="post_messages"),
    path('<str:room_name>/delete/', views.delete_message, name="delete_messages"),

]