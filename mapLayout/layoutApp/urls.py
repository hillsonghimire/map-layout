from django.urls import path
from . import views

urlpatterns = [
    path('district/', views.district),
    path('', views.index)
]
