from django.urls import path
from . import views
from .views import district, selectDistrict

urlpatterns = [
    path('district/', views.district),
    path('', views.index),
    path('selectDistrict/', selectDistrict)
]
