from django.contrib import admin
from .models import District
from leaflet.admin import LeafletGeoAdmin

# Register your models here.
admin.site.register(District)