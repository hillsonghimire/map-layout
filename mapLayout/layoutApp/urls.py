from django.urls import path
from . import views
from .views import district

urlpatterns = [
    path('district/', views.district),
    path('', views.index)
]
