from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse
from .models import District
from . import templates

# Create your views here.
def index(request):
    return render(request,'layoutApp/index.html')

def district(request):  #function name should be different from model name
    districtData = serialize('geojson',District.objects.all())  #conversion of data to geojson format
    return HttpResponse(districtData,content_type='geojson')
