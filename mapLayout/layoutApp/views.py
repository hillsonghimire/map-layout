from django.shortcuts import render
from .import templates
from .models import Province,District,Gapanapa
from django.core.serializers import serialize
from django.http import HttpResponse
import json
from django.db import connection


# Create your views here.


def index(request):
    return render(request,'index.html')
def province(request):
    provinceData=serialize('geojson',Province.objects.all())
    return HttpResponse(provinceData,content_type='geojson')


def district(request):
        if request.method == "POST":
            a = json.loads(request.body.decode('utf-8'))
            
            b=a['Province_Number']
            dataDistrict=District.objects.filter(first_stat=b)
            data1=serialize('geojson',dataDistrict)
        return HttpResponse(data1,content_type='geojson')

def ganapa(request):
        if request.method == "POST":
            a = json.loads(request.body.decode('utf-8'))
            
            b=a['Gapa_Name']
            print(b)
            dataGanapa=Gapanapa.objects.filter(district=b)
            data=serialize('geojson',dataGanapa)
        return HttpResponse(data,content_type='geojson')
        # return HttpResponse('Hello')



