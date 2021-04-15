from django.shortcuts import render
from . import templates
# Create your views here.

def index(request):
    return render(request,"layoutApp/index.html")

def District(request):
    return render()