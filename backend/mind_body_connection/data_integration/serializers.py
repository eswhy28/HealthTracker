from rest_framework import serializers
from .models import HealthMetric, SleepData, JournalEntry

class HealthMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthMetric
        fields = '__all__'
class SleepDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepData
        fields = '__all__'

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'