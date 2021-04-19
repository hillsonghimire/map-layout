from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import District
from . import templates
import json

# To run EarthEngine
import ee
ee.Initialize()

# Create your views here.

def index(request):
    return render(request, 'layoutApp/index.html')


def district(request):
    districtData = serialize('geojson', District.objects.all())
    return HttpResponse(districtData, content_type='application/geojson')

def selectDistrict(request):
    if request.method == "POST":
        featureReceived = json.loads(request.body.decode("utf-8"))
        featureReceivedName = featureReceived['featureName']
        featureDbInformation=District.objects.filter(first_dist=featureReceivedName)

        featureSerializer = serialize('geojson', featureDbInformation)
        deserialized = json.loads(featureSerializer)
        coords = deserialized['features'][0]['geometry']['coordinates']

        geometry = ee.Geometry.MultiPolygon(coords)
        context = {
            "tile": tileFetcher(geometry),
            "band_viz": getVisParam(),
            "title": "Satellite Imagery",
        }
        json_str = json.dumps(context)
        return HttpResponse(json_str)

        # Alternative
        # return JsonResponse(context)


def getVisParam():
    viz_param = {
        'min': 0,
        'max': 2000,
        'palette': ['222222', 'ffffff', '545454', '034B48', ]}
    return viz_param


def tileFetcher(geom):
    image = (ee.ImageCollection('MODIS/006/MOD13Q1')
             .filter(ee.Filter.date('2019-07-01', '2019-11-30'))
             .first()).select('NDVI').clip(geom)
    map_id_dict = ee.Image(image).getMapId(getVisParam())
    tile = map_id_dict['tile_fetcher'].url_format
    return tile
