from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse
from .models import District
from . import templates
import json

# Create your views here.


def index(request):
    return render(request, 'layoutApp/index.html')


def district(request):
    districtData = serialize('geojson', District.objects.all())
    return HttpResponse(districtData, content_type='application/geojson')


def selectDistrict(request):
    if request.method == "POST":
        name = json.loads(request.body.decode("utf-8"))
        print(name['featureName'])
    return HttpResponse("Transfer Complete. Data successfully Received.")
