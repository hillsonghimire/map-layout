import json
import requests
import osm2geojson

# Fetch Overpass Turbo OSM Data to views.py based on Query Parameters
def overpassAPI():
    apiURL = "https://overpass-api.de/api/xapi?*"
    taginfo = """[amenity=school]"""
    bound = "[bbox=85.9,27.8,86,28]"
    built_query = apiURL + taginfo+bound
    response = (requests.get(built_query)).text.encode('UTF-8')

    geojsonDictionary = osm2geojson.xml2geojson(
        response, filter_used_refs=False, log_level='INFO')

    jsonResponse = json.dumps(geojsonDictionary)
    return jsonResponse
