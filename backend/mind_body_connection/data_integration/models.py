from django.db import models

class HealthMetric(models.Model):
    user_id = models.CharField(max_length=50)
    date = models.DateField()
    steps = models.IntegerField()
    heart_rate = models.IntegerField()
    sleep_hours = models.FloatField()
    hrv = models.IntegerField()

    def __str__(self):
        return f"Metrics for {self.user_id} on {self.date}"

class SleepData(models.Model):
    user_id = models.CharField(max_length=50)
    date = models.DateField()
    duration = models.FloatField(help_text="Duration of sleep in hours")
    disturbances = models.IntegerField(help_text="Number of disturbances during sleep")
    sleep_quality = models.FloatField(default=0.0, help_text="Quality of sleep on a scale of 0-100")

    def __str__(self):
        return f"Sleep data for {self.user_id} on {self.date}"

class JournalEntry(models.Model):
    user_id = models.CharField(max_length=50)
    date = models.DateField()
    entry = models.TextField()

    def __str__(self):
        return f"Journal entry for {self.user_id} on {self.date}"