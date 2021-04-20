from django.urls import path
# from .views import index
from .views import  province,index ,ganapa

urlpatterns = [
    path('',index, name='index'),
    path('provinceData/',province, name='provinceData'),
    # path('districtJson/',district, name='districtJson'),
    path('ganapaData/',ganapa ,name='ganapaData'),

]

