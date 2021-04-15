from django.urls import path
from . import views

urlpatterns = [
    path('districtJson/', views.district),
    path('', views.index)
]
