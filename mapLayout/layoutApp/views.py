from django.shortcuts import render
from .import templates
from .models import Province
from django.core.serializers import serialize
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request,'index.html')
def province(request):
    provinceData=serialize('geojson',Province.objects.all())
    return HttpResponse(provinceData,content_type='geojson')
    