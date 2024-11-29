from django.urls import path
from .views import (
    HealthMetricView,
    SleepDataView,
    JournalEntryView,
    HealthInsightsView
)

urlpatterns = [
    path('metrics/', HealthMetricView.as_view(), name='metrics'),
    path('sleep/', SleepDataView.as_view(), name='sleep_data'),
    path('journal/', JournalEntryView.as_view(), name='journal_entries'),
    path('insights/', HealthInsightsView.as_view(), name='health_insights'),
]