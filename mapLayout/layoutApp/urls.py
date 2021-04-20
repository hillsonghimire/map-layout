from django.urls import path
from . import views
from .views import district, osmfetcher

urlpatterns = [
    path('', views.index),
    path('districtData/',district, name='data'),
    path('osmfetch/',osmfetcher, name="osmdata"),
]
