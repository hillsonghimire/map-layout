from django.shortcuts import render
from .import templates
from .models import Province,District,Gapanapa
from django.core.serializers import serialize
from django.http import HttpResponse
import ujson
import json
from django.db import connection


# Create your views here.


def index(request):
    return render(request,'index.html')
def province(request):
    provinceData=serialize('geojson',Province.objects.all())
    return HttpResponse(provinceData,content_type='geojson')


def ganapa(request):
        if request.method == "POST":
            a = json.loads(request.body.decode('utf-8'))
            if a['level2'] !='':
                dataGanapa=Gapanapa.objects.filter(palika=a['level2'])
                dataSurrounding=Gapanapa.objects.filter(district=a['level1'])
                b=serialize('geojson',dataGanapa)
                c=serialize('geojson',dataSurrounding)
                context={
                    'level0':b,
                    'level0':c
                }

            
                x=json.dumps(context).replace('/', r'\/')

                # data=json.parse(json.parse(x).level0)
                k=open("y.json","w+")
                k.write(x)
                k.close()
                return HttpResponse(x,content_type='application/geojson')
            # elif a['level1'] !='':
            #     dataDistrict=District.objects.filter(first_dist=a['level1'])
            #     dataSurrounding=District.objects.filter(first_stat=a['level1'])
            #     context={
            #         'level0' : dataDistrict,
            #         'level1' :dataSurrounding
            #     }
            #     json = json.dumps(context) 
            #     print(json)
            #     context=serialize('geojson',dataDistrict)
            #     return HttpResponse(context,content_type='geojson')
            # else :
            #     dataProvince=Province.objects.filter(first_stat=a['level0'])


#             data=serialize('geojson',dataDistrict)
#         return HttpResponse(data,content_type='geojson')

# def ganapa(request):
#         if request.method == "POST":
#             a = json.loads(request.body.decode('utf-8'))
#             print(a)
            
#             b=a['Name']
#             dataGanapa=Gapanapa.objects.filter(palika=b)
#             data=serialize('geojson',dataGanapa)
#         return HttpResponse(data,content_type='geojson')
# def district(request):
#         if request.method == "POST":
#             a = json.loads(request.body.decode('utf-8'))
#             print(a)
#             b=a['Name']
#             dataGanapa=District.objects.filter(first_stat=b)
#             data=serialize('geojson',dataGanapa)
#         return HttpResponse(data,content_type='geojson')
