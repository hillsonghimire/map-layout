import json
from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse
from .models import District
from . import templates
from osmfetch import overpassfetch  # importing function from py file

# Create your views here.
def index(request):
    return render(request,'layoutApp/index.html')

def district(request):  #function name should be different from model name
    districtData = serialize('geojson',District.objects.all())  #conversion of data to geojson format
    return HttpResponse(districtData,content_type='geojson')

def osmfetcher(request):
    if request.method == "POST":
        receivedData =  json.loads(request.body.decode("utf-8"))
        amenity= receivedData['amenity']
        bound = receivedData['bound']
        
        osmdata = overpassfetch(amenity, bound)
        return HttpResponse(osmdata,content_type='geojson')


