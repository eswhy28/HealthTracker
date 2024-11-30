import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import moment from 'moment';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RecommendIcon from '@mui/icons-material/Recommend';
import TagIcon from '@mui/icons-material/Tag';

const HealthCharts = ({ metrics = [], sleep = [], journal = {} }) => {
  // Default values for journal sentiments
  const defaultJournalSentiments = {
    average_sentiment: 0,
    overall_mood: 'neutral',
    sentiment_breakdown: {
      positive_percentage: 0,
      negative_percentage: 0,
      neutral_percentage: 0
    },
    emotional_keywords: [],
    recommendation: 'No recommendations available at this time.'
  };

  // Safely access journal sentiments with fallback to defaults
  const journalSentiments = journal?.journal_sentiments || defaultJournalSentiments;

  // Safely prepare chart data with null checks
  const chartData = (metrics || []).map((metric, index) => ({
    date: metric?.date ? moment(metric.date).format('MM/DD') : `Day ${index + 1}`,
    steps: metric?.steps || 0,
    heart_rate: metric?.heart_rate || 0,
    sleep_quality: sleep[index]?.sleep_quality || 0,
    sleep_duration: sleep[index]?.duration || 0
  }));

  // Helper function to check if data exists
  const hasData = {
    metrics: Array.isArray(metrics) && metrics.length > 0,
    sleep: Array.isArray(sleep) && sleep.length > 0,
    journal: Object.keys(journal || {}).length > 0
  };

  return (
    <Grid container spacing={3}>
      {/* Sentiment Analysis Card */}
      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ background: 'linear-gradient(135deg, #f6f9fc 0%, #f1f5f9 100%)' }}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SentimentVerySatisfiedIcon color="primary" />
                  Emotional Wellness Insights
                </Typography>
                
                {!hasData.journal && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    No journal data available yet. Start journaling to see your emotional insights.
                  </Alert>
                )}

                {/* Positive Sentiment */}
                <Box sx={{ mt: 3, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Positive Energy
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {journalSentiments.sentiment_breakdown?.positive_percentage?.toFixed(2) || 0}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={journalSentiments.sentiment_breakdown?.positive_percentage || 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4caf50',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>

                {/* Emotional Keywords */}
                <Box sx={{ mt: 3 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      mb: 1 
                    }}
                  >
                    <TagIcon fontSize="small" color="primary" />
                    Emotions
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {(journalSentiments.emotional_keywords || []).map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        sx={{
                          background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                          color: 'white'
                        }}
                      />
                    ))}
                    {(!journalSentiments.emotional_keywords || journalSentiments.emotional_keywords.length === 0) && (
                      <Typography variant="body2" color="text.secondary">
                        No emotional themes identified yet
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Recommendation */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      mb: 1,
                      color: '#1976d2'
                    }}
                  >
                    <RecommendIcon fontSize="small" />
                    Wellness Recommendation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {journalSentiments.recommendation || 'No recommendations available at this time.'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Steps and Heart Rate Chart */}
      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity and Heart Rate
              </Typography>
              {!hasData.metrics && (
                <Alert severity="info">
                  No activity data available yet. Start tracking your activities to see your progress.
                </Alert>
              )}
              {hasData.metrics && (
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#28A745" />
                    <YAxis yAxisId="right" orientation="right" stroke="#DC3545" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="steps" 
                      stroke="#28A745" 
                      activeDot={{ r: 8 }} 
                      name="Daily Steps"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="heart_rate" 
                      stroke="#DC3545" 
                      name="Heart Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Sleep Quality and Duration Chart */}
      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sleep Analysis
              </Typography>
              {!hasData.sleep && (
                <Alert severity="info">
                  No sleep data available yet. Start tracking your sleep to see your patterns.
                </Alert>
              )}
              {hasData.sleep && (
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4A90E2" />
                    <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="sleep_quality" 
                      fill="#4A90E2" 
                      name="Sleep Quality (%)"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="sleep_duration" 
                      stroke="#8884d8" 
                      name="Sleep Duration (hrs)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HealthCharts;