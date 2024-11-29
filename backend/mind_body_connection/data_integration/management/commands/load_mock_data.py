import json
from django.core.management.base import BaseCommand
from data_integration.models import HealthMetric, SleepData, JournalEntry

class Command(BaseCommand):
    help = 'Load mock data for Health Metrics, Sleep, and Journaling into the database'

    def handle(self, *args, **kwargs):
        try:
            # Load Health Metrics Data
            with open('health_metric_data.json') as health_file:
                health_data = json.load(health_file)
                for metric in health_data['metrics']:
                    HealthMetric.objects.create(
                        user_id=health_data['user_id'],
                        date=metric['date'],
                        steps=metric['steps'],
                        heart_rate=metric['heart_rate'],
                        sleep_hours=metric['sleep_hours'],
                        hrv=metric['hrv']
                    )
            self.stdout.write(self.style.SUCCESS('Loaded Health Metrics Data'))

            # Load Sleep Data
            with open('sleep_data.json') as sleep_file:
                sleep_data = json.load(sleep_file)
                for record in sleep_data:
                    SleepData.objects.create(
                        user_id=record['user_id'],
                        date=record['date'],
                        duration=record['duration'],
                        disturbances=record['disturbances'],
                        sleep_quality=record['sleep_quality']
                    )
            self.stdout.write(self.style.SUCCESS('Loaded Sleep Data'))

            # Load Journal Data
            with open('journal_data.json') as journal_file:
                journal_data = json.load(journal_file)
                for record in journal_data:
                    JournalEntry.objects.create(
                        user_id=record['user_id'],
                        date=record['date'],
                        entry=record['entry']
                    )
            self.stdout.write(self.style.SUCCESS('Loaded Journal Data'))

        except FileNotFoundError as e:
            self.stderr.write(self.style.ERROR(f"File not found: {e.filename}"))
        except json.JSONDecodeError as e:
            self.stderr.write(self.style.ERROR(f"JSON decode error: {str(e)}"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"An unexpected error occurred: {str(e)}"))
