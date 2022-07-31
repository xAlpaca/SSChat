"""SSChat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import path
from .views import index, room, room_get, room_get_last, room_delete_message, room_delete_all_messages, room_post, room_get_amount
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('<str:room_name>/', room, name="room"),
    path('<str:room_name>/get/', room_get, name="room_get"),
    path('<str:room_name>/post/', room_post, name="room_post"),
    path('<str:room_name>/get_last/', room_get_last, name="room_get_last"),
    path('<str:room_name>/get/<int:amount>', room_get_amount, name="room_get"),
    path('<str:room_name>/delete/', room_delete_message, name="delete_message"),
    path('<str:room_name>/delete_all/', room_delete_all_messages, name="delete_all_messages"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
