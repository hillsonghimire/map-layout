from rest_framework import serializers
class DistrictSerializer(serializers.Serialize):
    gid =serializers.IntegerField()
    first_dist=serializers.CharField(max_length=100)
    first_stat=serializers.IntegerField()
    shape_leng=serializers.FloatField()
    shape_area=serializers.FloatField()
    geom=serializers.MultiPolygonField()