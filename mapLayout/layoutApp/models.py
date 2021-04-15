from django.db import models
from django.contrib.gis.db import models as gis_models

# Create your models here.



class District(models.Model):
    gid = models.AutoField(primary_key=True)
    ddgn = models.BigIntegerField(blank=True, null=True)
    first_dcod = models.IntegerField(blank=True, null=True)
    first_dist = models.CharField(max_length=50, blank=True, null=True)
    first_gn_c = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    first_stat = models.IntegerField(blank=True, null=True)
    shape_leng = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    shape_area = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    centroid_x = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    centroid_y = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    # geom = gis_models.TextField(blank=True, null=True)  # This field type is a guess.
    geom = gis_models.MultiPolygonField(srid=4326,blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'district'

    def __str__(self):
        return self.first_dist