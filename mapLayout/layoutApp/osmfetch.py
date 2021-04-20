import osm2geojson
import requests
import json
# fetch osm data from overpass api


def overpassfetch(amenity, bound):
    url = "https://overpass-api.de/api/xapi?*"
    taginfo = "[amenity="+amenity+"]"  
    bound = "[bbox="+bound+"]"  
    built_query = url + taginfo+bound
    response = requests.get(built_query)
    xml = response.text.encode('UTF-8')
    # convert xml data to python dictionary
    geojsonDict = osm2geojson.xml2geojson(
        xml, filter_used_refs=False, log_level='INFO')
    # convert python dictionary to json format
    json = json.dumps(geojsonDict)
    return(json)


