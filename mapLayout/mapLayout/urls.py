from django.contrib import admin
from django.urls import path, include
from layoutApp import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('layoutApp.urls')),
]
