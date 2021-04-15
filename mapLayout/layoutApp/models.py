from django.db import models
from django.contrib.gis.db import models as gis_models

# Create your models here.

class District(models.Model):
    gid = models.AutoField(primary_key=True)
    # Field renamed because it contained more than one '_' in a row. Field renamed because it started with '_'.
    field_gid = models.BigIntegerField(
        db_column='__gid', blank=True, null=True)
    ddgn = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    first_dcod = models.BigIntegerField(blank=True, null=True)
    first_dist = models.CharField(max_length=50, blank=True, null=True)
    first_gn_c = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    first_stat = models.BigIntegerField(blank=True, null=True)
    shape_leng = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    shape_area = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    area = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    centroid_x = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    centroid_y = models.DecimalField(
        max_digits=65535, decimal_places=65535, blank=True, null=True)
    # This field type is a guess.
    geom = gis_models.MultiPolygonField(srid=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'district'

    def __str__(self):
        return self.first_dist


# class Gapanapa(models.Model):
#     gid = models.AutoField(primary_key=True)
#     # Field renamed because it contained more than one '_' in a row. Field renamed because it started with '_'.
#     field_gid = models.BigIntegerField(
#         db_column='__gid', blank=True, null=True)
#     objectid_1 = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     objectid = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     palika = models.CharField(max_length=50, blank=True, null=True)
#     district = models.CharField(max_length=50, blank=True, null=True)
#     gapa_napa = models.CharField(max_length=50, blank=True, null=True)
#     gn_type = models.CharField(max_length=50, blank=True, null=True)
#     province = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     shape_leng = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     shape_area = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     # This field type is a guess.
#     geom = gis_models.MultiPolygonField(srid=4326, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'gapanapa'


# class Province(models.Model):
#     gid = models.AutoField(primary_key=True)
#     # Field renamed because it contained more than one '_' in a row. Field renamed because it started with '_'.
#     field_gid = models.BigIntegerField(
#         db_column='__gid', blank=True, null=True)
#     ddgn = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     first_dcod = models.BigIntegerField(blank=True, null=True)
#     first_dist = models.CharField(max_length=50, blank=True, null=True)
#     first_gn_c = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     first_stat = models.BigIntegerField(blank=True, null=True)
#     shape_leng = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     shape_area = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     area = models.DecimalField(
#         max_digits=65535, decimal_places=65535, blank=True, null=True)
#     # This field type is a guess.
#     geom = gis_models.MultiPolygonField(srid=4326, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'province'
