from django.urls import path
# from .views import index
from .views import  province,index 

urlpatterns = [
    path('',index, name='index'),
    # path('', views.province),
    path('provinceData',province, name='provinceData'),

]

