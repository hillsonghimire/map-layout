from django.urls import path
from . import views
from .views import district, eeLayer, overpassFetch

urlpatterns = [
    path('district/', views.district),
    path('', views.index),
    path('eeLayer/', eeLayer),
    path('overpassFetch/', overpassFetch),
    # path('admin/', admin),

]
