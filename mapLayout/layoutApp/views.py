from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse
from .models import District

# Create your views here.
def index(request):
    return render(request,'index.html')

def District(request):
    districtData = serialize('geojson',District.objects.all())  #conversion of data to geojson format
    return HttpResponse(districtData,content_type='geojson')
