import numpy as np
import json
from .insights_generator import process_health_insights,HealthInsightsGenerator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import datetime

from .models import HealthMetric, SleepData, JournalEntry
from .serializers import HealthMetricSerializer, SleepDataSerializer, JournalEntrySerializer

class BaseFilteredView:
    def filter_by_date_range(self, queryset, start_date=None, end_date=None):
        """
        Filter queryset by optional date range
        """
        if start_date and end_date:
            try:
                start = datetime.strptime(start_date, '%Y-%m-%d').date()
                end = datetime.strptime(end_date, '%Y-%m-%d').date()
                return queryset.filter(date__range=[start, end])
            except ValueError:
                raise ValueError("Invalid date format. Use YYYY-MM-DD")
        return queryset

class HealthMetricView(APIView, BaseFilteredView):
    def get(self, request):
        # Get optional query parameters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        user_id = request.query_params.get('user_id')

        # Start with all metrics
        metrics = HealthMetric.objects.all()

        # Apply user filter if provided
        if user_id:
            metrics = metrics.filter(user_id=user_id)

        # Apply date range filter
        try:
            metrics = self.filter_by_date_range(metrics, start_date, end_date)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = HealthMetricSerializer(metrics, many=True)
        return Response(serializer.data)

    def options(self, request):
        # Handle preflight requests
        response = HttpResponse()
        response['Allow'] = 'GET, OPTIONS'
        return self.add_cors_headers(response)

    def add_cors_headers(self, response):
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

    def dispatch(self, request, *args, **kwargs):
        # Add CORS headers to the response
        response = super().dispatch(request, *args, **kwargs)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

class SleepDataView(APIView, BaseFilteredView):
    def get(self, request):
        # Get optional query parameters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        user_id = request.query_params.get('user_id')

        # Start with all sleep data
        sleep_data = SleepData.objects.all()

        # Apply user filter if provided
        if user_id:
            sleep_data = sleep_data.filter(user_id=user_id)

        # Apply date range filter
        try:
            sleep_data = self.filter_by_date_range(sleep_data, start_date, end_date)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = SleepDataSerializer(sleep_data, many=True)
        return Response(serializer.data)

    def options(self, request):
        # Handle preflight requests
        response = HttpResponse()
        response['Allow'] = 'GET, OPTIONS'
        return self.add_cors_headers(response)

    def add_cors_headers(self, response):
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

    def dispatch(self, request, *args, **kwargs):
        # Add CORS headers to the response
        response = super().dispatch(request, *args, **kwargs)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

class JournalEntryView(APIView, BaseFilteredView):
    def get(self, request):
        # Get optional query parameters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        user_id = request.query_params.get('user_id')

        # Start with all journal entries
        journal_entries = JournalEntry.objects.all()

        # Apply user filter if provided
        if user_id:
            journal_entries = journal_entries.filter(user_id=user_id)

        # Apply date range filter
        try:
            journal_entries = self.filter_by_date_range(journal_entries, start_date, end_date)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = JournalEntrySerializer(journal_entries, many=True)
        return Response(serializer.data)

    def options(self, request):
        # Handle preflight requests
        response = HttpResponse()
        response['Allow'] = 'GET, OPTIONS'
        return self.add_cors_headers(response)

    def add_cors_headers(self, response):
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

    def dispatch(self, request, *args, **kwargs):
        # Add CORS headers to the response
        response = super().dispatch(request, *args, **kwargs)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

def custom_json_encoder(obj):
    if isinstance(obj, np.float64):
        if np.isnan(obj):
            return None
        return float(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")


class HealthInsightsView(APIView):
    def get(self, request):
        # Extract query parameters
        duration = request.query_params.get('duration', 'weekly')
        user_id = request.query_params.get('user_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        agent = request.query_params.get('agent')

        # Base querysets
        health_metrics = HealthMetric.objects.all()
        sleep_data = SleepData.objects.all()
        journal_entries = JournalEntry.objects.all()

        # Apply user_id filter if provided
        if user_id:
            health_metrics = health_metrics.filter(user_id=user_id)
            sleep_data = sleep_data.filter(user_id=user_id)
            journal_entries = journal_entries.filter(user_id=user_id)

        # Apply date range filtering
        if start_date and end_date:
            try:
                start_date = timezone.datetime.strptime(start_date, '%Y-%m-%d').date()
                end_date = timezone.datetime.strptime(end_date, '%Y-%m-%d').date()
                health_metrics = health_metrics.filter(date__range=[start_date, end_date])
                sleep_data = sleep_data.filter(date__range=[start_date, end_date])
                journal_entries = journal_entries.filter(date__range=[start_date, end_date])
            except ValueError:
                return Response(
                    {"error": "Invalid date format. Use YYYY-MM-DD"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Validate data availability
        if not health_metrics.exists():
            return Response(
                {"message": "No health metrics available for the specified criteria"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Process insights
        try:
            insights_generator = HealthInsightsGenerator(health_metrics, sleep_data, journal_entries)

            # If a specific agent is requested, return its insights
            if agent:
                if agent.lower() == 'fitness':
                    insights = insights_generator.generate_fitness_insights()
                elif agent.lower() == 'sleep':
                    insights = insights_generator.generate_sleep_insights()
                elif agent.lower() == 'journal':
                    insights = insights_generator.analyze_journal_sentiments()
                else:
                    return Response(
                        {"error": "Invalid agent specified"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                # Otherwise, return full holistic insights
                insights = insights_generator.generate_holistic_insights()

            return Response(json.loads(json.dumps(insights, default=custom_json_encoder)))

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )