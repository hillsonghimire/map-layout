from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import District
from . import templates
import json
from .dataFetch import overpassAPI

# To run EarthEngine
import ee
ee.Initialize()

# Create your views here.


def index(request):
    return render(request, 'layoutApp/index.html')


def district(request):
    districtData = serialize('geojson', District.objects.all())
    return HttpResponse(districtData, content_type='application/geojson')


def eeLayer(request):
    if request.method == "POST":
        featureReceived = json.loads(request.body.decode("utf-8"))
        featureReceivedName = featureReceived['featureName']
        featureDbInformation = District.objects.filter(
            first_dist=featureReceivedName)

        featureSerializer = serialize('geojson', featureDbInformation)
        deserialized = json.loads(featureSerializer)
        coords = deserialized['features'][0]['geometry']['coordinates']

        geometry = ee.Geometry.MultiPolygon(coords)
        context = {
            "tile": tileFetcherNDVI(geometry),
            "band_viz": getVisParamNDVI(),
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
             .filter(ee.Filter.date('2016-07-01', '2019-11-30'))
             .first()).select('NDVI').clip(geom)
    map_id_dict = ee.Image(image).getMapId(getVisParam())
    tile = map_id_dict['tile_fetcher'].url_format
    return tile


# NDVI MAP

def getVisParamNDVI():
    viz_param = {
        'min': -0.6,
        'max': 0.7,
        'palette': ['blue', 'white', '#e7c96c', '#006400']}
    return viz_param


def tileFetcherNDVI(geom):
    image = (ee.ImageCollection("COPERNICUS/S2_SR")
             .filterDate('2020-01-01', '2020-12-28')
             .filterBounds(geom)
             .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
             .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT', 10))
             .mosaic().clip(geom))
    B4 = image.select('B4')
    B8 = image.select('B8')
    ndviImage = B8.subtract(B4).divide(B8.add(B4))
    map_id_dict = ee.Image(ndviImage).getMapId(getVisParamNDVI())
    tile = map_id_dict['tile_fetcher'].url_format
    return tile




# Overpass Query API
def overpassFetch(request):
    # This line is missing the operation that we need to do with request. The request is supposed to pass some Query Parameters.
    data = overpassAPI()
    return HttpResponse(data, content_type='application/geojson')






#To query the features of district and all


# def admin(request):
#     if request.method == "POST":
#         featureReceived = json.loads(request.body.decode("utf-8"))
#         level0 = featureReceived['level0']
#         level1 = featureReceived['level1']
#         level2 = featureReceived['level2']
#         featureDbInformation = District.objects.filter(
#             first_dist=featureReceivedName)

#         featureSerializer = serialize('geojson', featureDbInformation)
#         deserialized = json.loads(featureSerializer)
#         coords = deserialized['features'][0]['geometry']['coordinates']

#         geometry = ee.Geometry.MultiPolygon(coords)
#         context = {
#             "lovwel": tileFetcherNDVI(geometry),
#             "band_viz": getVisParamNDVI(),
#             "title": "Satellite Imagery",
#         }
#         json_str = json.dumps(context)
#         return HttpResponse(json_str)
#     districtData = serialize('geojson', District.objects.all())
#     return HttpResponse(districtData, content_type='application/geojson')