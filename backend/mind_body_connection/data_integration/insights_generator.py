import numpy as np
import pandas as pd
import random
from typing import Dict, Any, List
from textblob import TextBlob
from collections import Counter

class HealthInsightsGenerator:
    def __init__(self, health_metrics, sleep_data, journal_entries):
        """
        Initialize the health insights generator with various health-related datasets.

        :param health_metrics: Collection of fitness and physiological metrics
        :param sleep_data: Collection of sleep-related information
        :param journal_entries: Collection of user journal entries
        """
        self.health_metrics = health_metrics
        self.sleep_data = sleep_data
        self.journal_entries = journal_entries

    def generate_fitness_insights(self):
        """
        Analyze fitness metrics and provide predictive insights.

        :return: Dictionary of fitness predictions and trends
        """
        # Simulate a more conceptual approach to fitness insights
        metrics = {
            'steps': self._analyze_trend(self.health_metrics, 'steps'),
            'heart_rate': self._analyze_trend(self.health_metrics, 'heart_rate'),
            'hrv': self._analyze_trend(self.health_metrics, 'hrv')
        }

        return {
            'steps_prediction': metrics['steps'],
            'heart_rate_prediction': metrics['heart_rate'],
            'hrv_prediction': metrics['hrv']
        }

    def _analyze_trend(self, data_collection, metric_name):
        """
        Conceptual trend analysis for a specific metric.

        :param data_collection: Collection of health metrics
        :param metric_name: Name of the metric to analyze
        :return: Trend analysis dictionary
        """
        if not data_collection:
            return {
                'trend': 'insufficient_data',
                'next_prediction': None,
                'recommendation': 'Collect more data to gain insights'
            }

        # Extract metric values
        values = [getattr(item, metric_name) for item in data_collection]

        # Simple trend detection
        if len(values) > 1:
            trend = 'increasing' if values[-1] > values[0] else 'decreasing'
            next_prediction = values[-1] * (1.1 if trend == 'increasing' else 0.9)
        else:
            trend = 'stable'
            next_prediction = values[0]

        # Generate contextual recommendation
        recommendation = self._generate_metric_recommendation(metric_name, trend)

        return {
            'trend': trend,
            'next_prediction': round(float(next_prediction), 2),
            'recommendation': recommendation
        }

    def _generate_metric_recommendation(self, metric_name, trend):
        """
        Generate personalized recommendations based on metric trends.

        :param metric_name: Name of the health metric
        :param trend: Trend of the metric
        :return: Personalized recommendation string
        """
        recommendations = {
            'steps': {
                'decreasing': 'Increase weekly activity by 10%. Suggested actions: walking meetings, taking stairs, or adding short walks.',
                'increasing': 'Excellent progress! Maintain current activity level and gradually increase intensity.',
                'stable': 'Personalized workout plan: Add variety to your routine to challenge different muscle groups.'
            },
            'heart_rate': {
                'decreasing': 'Your resting heart rate is improving. Continue your current fitness routine.',
                'increasing': 'Monitor your stress levels and consider relaxation techniques.',
                'stable': 'Your heart rate shows consistent patterns. Keep up your current health practices.'
            },
            'hrv': {
                'decreasing': 'Low HRV might indicate stress. Focus on recovery and mindfulness.',
                'increasing': 'Your heart rate variability is improving. Great sign of fitness and stress management!',
                'stable': 'Your HRV indicates consistent stress management. Maintain your current practices.'
            }
        }

        return recommendations.get(metric_name, {}).get(trend, 'Continue monitoring your health metrics.')

    def generate_sleep_insights(self):
        """
        Analyze sleep data and provide insights.

        :return: Dictionary of sleep-related insights
        """
        if not self.sleep_data:
            return {
                'average_duration': None,
                'average_quality': None,
                'recommendation': 'Start tracking your sleep to gain insights'
            }

        durations = [item.duration for item in self.sleep_data]
        qualities = [item.sleep_quality for item in self.sleep_data]

        avg_duration = np.mean(durations)
        avg_quality = np.mean(qualities)

        recommendation = self._generate_sleep_recommendation(avg_duration, avg_quality)

        return {
            'average_duration': round(avg_duration, 2),
            'average_quality': round(avg_quality, 2),
            'recommendation': recommendation
        }

    def _generate_sleep_recommendation(self, avg_duration, avg_quality):
        if avg_duration < 6:
            return 'Increase sleep duration to 7-9 hours. Establish consistent bedtime routine: fixed sleep/wake times, relaxation techniques, limit screen time 1 hour before bed.'
        elif 6 <= avg_duration < 7:
            return 'Optimize sleep quality: Create sleep-friendly environment, reduce caffeine intake, practice evening relaxation methods.'
        elif avg_quality < 60:
            return 'Improve sleep quality: Use white noise, ensure dark room, maintain cool temperature, try meditation before sleep.'

    def analyze_journal_sentiments(self):
        """
        Perform comprehensive sentiment analysis on journal entries.
        """
        if not self.journal_entries:
            return {
                'average_sentiment': 0,
                'overall_mood': 'neutral',
                'sentiment_breakdown': {
                    'positive_percentage': 0,
                    'negative_percentage': 0,
                    'neutral_percentage': 100
                },
                'emotional_keywords': [],
                'recommendation': 'Start journaling to track emotional patterns'
            }

        # Perform detailed sentiment analysis
        sentiments = []
        emotional_keywords = []

        for entry in self.journal_entries:
            blob = TextBlob(str(entry.entry))
            sentiment = blob.sentiment.polarity
            sentiments.append(sentiment)

            # Simple emotional keyword extraction
            emotional_terms = [
                word.lower() for word in str(entry.entry).split()
                if word.lower() in ['stress', 'happy', 'sad', 'anxiety', 'excited',
                                    'worry', 'joy', 'frustrated', 'calm', 'overwhelmed']
            ]
            emotional_keywords.extend(emotional_terms)

        # Calculate sentiment percentages
        positive_entries = sum(1 for s in sentiments if s > 0.2)
        negative_entries = sum(1 for s in sentiments if s < -0.2)
        neutral_entries = sum(1 for s in sentiments if -0.2 <= s <= 0.2)

        total_entries = len(sentiments)
        positive_percentage = round((positive_entries / total_entries) * 100, 2) if total_entries > 0 else 0
        negative_percentage = round((negative_entries / total_entries) * 100, 2) if total_entries > 0 else 0
        neutral_percentage = round((neutral_entries / total_entries) * 100, 2) if total_entries > 0 else 0

        # Determine overall mood
        avg_sentiment = np.mean(sentiments) if sentiments else 0
        overall_mood = self._classify_sentiment(avg_sentiment)

        # Generate detailed recommendation
        recommendation = self._generate_mood_recommendation(
            overall_mood,
            positive_percentage,
            negative_percentage,
            emotional_keywords
        )

        return {
            'average_sentiment': round(avg_sentiment, 4),
            'overall_mood': overall_mood,
            'sentiment_breakdown': {
                'positive_percentage': positive_percentage,
                'negative_percentage': negative_percentage,
                'neutral_percentage': neutral_percentage
            },
            'emotional_keywords': list(set(emotional_keywords)),
            'recommendation': recommendation
        }

    def _classify_sentiment(self, sentiment_score):
        """
        Classify sentiment based on score.

        :param sentiment_score: Numerical sentiment score
        :return: Mood classification
        """
        if sentiment_score < -0.2:
            return 'negative'
        elif sentiment_score > 0.2:
            return 'positive'
        else:
            return 'neutral'

    def _generate_mood_recommendation(self, mood, positive_pct, negative_pct, keywords):
        """
        Generate nuanced mood recommendation with personalized insights
        """
        recommendation_templates = {
            'negative': [
                "Emotional resilience opportunity detected.",
                "Navigating challenging emotional terrain.",
                "Potential emotional growth phase identified."
            ],
            'neutral': [
                "Emotional equilibrium observed.",
                "Steady emotional baseline maintained.",
                "Balanced emotional state detected."
            ],
            'positive': [
                "Emotional strength and optimism evident.",
                "Positive emotional momentum sustained.",
                "Robust emotional well-being observed."
            ]
        }

        emotional_support_suggestions = {
            'negative': [
                "Explore structured emotional support strategies.",
                "Implement targeted stress-reduction techniques.",
                "Consider professional emotional guidance."
            ],
            'neutral': [
                "Proactively engage in personal development.",
                "Explore mindfulness and self-awareness practices.",
                "Set intentional emotional growth objectives."
            ],
            'positive': [
                "Leverage emotional momentum for personal growth.",
                "Maintain practices supporting emotional resilience.",
                "Continue nurturing positive emotional habits."
            ]
        }

        base_recommendation = random.choice(recommendation_templates.get(mood, recommendation_templates['neutral']))
        support_suggestion = random.choice(emotional_support_suggestions.get(mood, []))

        percentage_context = (
            f"Emotional Composition: {positive_pct}% positive, {negative_pct}% negative entries. "
        )

        keyword_insights = ""
        if keywords:
            top_keywords = Counter(keywords).most_common(3)
            keyword_str = ", ".join([k for k, _ in top_keywords])
            keyword_insights = f"Emotional Themes: {keyword_str}. "

        full_recommendation = (
            f"{base_recommendation} {percentage_context}"
            f"{keyword_insights}"
            f"{support_suggestion}"
        )

        return full_recommendation

    def generate_holistic_insights(self):
        """
        Aggregate insights from all health tracking agents with enhanced correlations.
        """
        fitness_insights = self.generate_fitness_insights()
        sleep_insights = self.generate_sleep_insights()
        journal_sentiments = self.analyze_journal_sentiments()

        # Enhanced correlative recommendation
        holistic_recommendation = self._generate_comprehensive_recommendation(
            fitness_insights,
            sleep_insights,
            journal_sentiments
        )

        return {
            'fitness_insights': fitness_insights,
            'sleep_insights': sleep_insights,
            'journal_sentiments': journal_sentiments,
            'wellness_score': self._calculate_wellness_score(
                fitness_insights, sleep_insights, journal_sentiments
            ),
            'holistic_recommendation': holistic_recommendation
        }

    def _calculate_wellness_score(self, fitness_insights, sleep_insights, journal_sentiments):
        """
        Calculate an overall wellness score based on multiple factors.

        :return: Numerical wellness score
        """
        # Conceptual wellness score calculation
        fitness_component = 50 + (
            20 if fitness_insights['steps_prediction']['trend'] == 'increasing' else -20
        )
        sleep_component = sleep_insights['average_quality'] if sleep_insights['average_quality'] else 50
        mood_component = {
            'negative': 30,
            'neutral': 50,
            'positive': 70
        }[journal_sentiments['overall_mood']]

        wellness_score = (fitness_component + sleep_component + mood_component) / 3
        return round(wellness_score, 2)

    def _generate_correlative_recommendation(self, fitness_insights, sleep_insights, journal_sentiments):
        """
        Generate holistic recommendations by correlating insights across different health dimensions.

        :return: Integrated health recommendation
        """
        recommendations = []

        # Check for potential stress indicators
        if (fitness_insights['hrv_prediction']['trend'] == 'decreasing' and
                sleep_insights['average_quality'] < 60 and
                journal_sentiments['overall_mood'] == 'negative'):
            recommendations.append(
                "Your data suggests high stress levels. Consider stress management techniques like meditation, "
                "reducing workout intensity, and creating a consistent sleep routine."
            )

        # Check for potential fitness and mood correlation
        if (fitness_insights['steps_prediction']['trend'] == 'decreasing' and
                journal_sentiments['overall_mood'] == 'negative'):
            recommendations.append(
                "Your activity levels and mood seem interconnected. Try engaging in enjoyable physical activities "
                "that boost both your fitness and emotional well-being."
            )

        # Default recommendation if no specific correlations are found
        if not recommendations:
            recommendations.append(
                "Your health metrics look balanced. Continue your current lifestyle and stay attentive to any changes."
            )

        return recommendations[0]

    def _generate_comprehensive_recommendation(self, fitness, sleep, journal):
        """
        Generate a multi-dimensional health recommendation
        """
        steps_trend = fitness['steps_prediction']['trend']
        heart_rate_trend = fitness['heart_rate_prediction']['trend']
        hrv_trend = fitness['hrv_prediction']['trend']
        sleep_quality = sleep['average_quality']
        mood = journal['overall_mood']
        positive_pct = journal['sentiment_breakdown']['positive_percentage']

        # Existing recommendation construction
        recommendation_parts = [
            f"Fitness Dynamics: Steps {steps_trend}, Heart Rate {heart_rate_trend}, HRV {hrv_trend}.",
            f"Sleep Quality: {sleep_quality}% - {'Needs Improvement' if sleep_quality < 60 else 'Stable'}.",
            f"Emotional Landscape: {mood.capitalize()} mood, {positive_pct}% positive entries."
        ]

        # Creative holistic suggestions based on specific trends
        holistic_suggestions = {
            ('decreasing', 'increasing', 'decreasing'):
                "Consider gentle recovery techniques, reduce workout intensity, and practice mindfulness to balance physiological stress.",

            ('decreasing', 'stable', 'stable'):
                "Implement progressive activity strategies, focus on gradual fitness improvements and consistent movement.",

            ('stable', 'increasing', 'decreasing'):
                "Prioritize stress management, incorporate relaxation practices, and monitor heart rate variability.",

            ('increasing', 'decreasing', 'increasing'):
                "Balance high-intensity activities with adequate recovery, emphasize sleep hygiene and stress reduction.",

            # Default suggestion
            'default':
                "Integrate holistic wellness practices: balanced nutrition, consistent sleep, mindful movement, and emotional self-care."
        }

        # Select appropriate suggestion based on current trends
        trend_key = (steps_trend, heart_rate_trend, hrv_trend)
        holistic_suggestion = holistic_suggestions.get(trend_key, holistic_suggestions['default'])

        # Combine recommendation
        full_recommendation = " ".join(recommendation_parts) + f" {holistic_suggestion}"

        return full_recommendation


def process_health_insights(health_metrics, sleep_data, journal_entries):

    insights_generator = HealthInsightsGenerator(health_metrics, sleep_data, journal_entries)
    return insights_generator.generate_holistic_insights()