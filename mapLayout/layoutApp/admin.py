from django.contrib import admin
from .models import Province
from leaflet.admin import LeafletGeoAdmin

# Register your models here.
class provinceAdmin(LeafletGeoAdmin):
    list_display = ['first_stat','first_dist'] #display first_stat and first_dist field of model
admin.site.register(Province,provinceAdmin)
