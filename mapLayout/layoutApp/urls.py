from django.urls import path
from . import views
from .views import district

urlpatterns = [
    path('', views.index),
    path('districtData/',district, name='data')
]
