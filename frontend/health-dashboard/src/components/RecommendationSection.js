import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Divider 
} from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SleepIcon from '@mui/icons-material/Bedtime';
import MoodIcon from '@mui/icons-material/Mood';
import WarningIcon from '@mui/icons-material/Warning';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const RecommendationCard = ({ 
  title, 
  recommendation, 
  trend, 
  nextPrediction, 
  icon, 
  color 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card 
      sx={{ 
        mb: 2, 
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box 
            sx={{ 
              backgroundColor: `${color}20`, 
              borderRadius: '50%', 
              p: 1, 
              mr: 2 
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>

        {trend && (
          <Box mb={2}>
            <Chip
              label={`Trend: ${trend}`}
              color={trend === 'increasing' ? 'success' : 'warning'}
              size="small"
              sx={{ mr: 1 }}
            />
            {nextPrediction && (
              <Chip
                label={`Next Prediction: ${nextPrediction}`}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        )}

        <Typography variant="body2" color="text.secondary">
          {recommendation}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const RecommendationSection = ({ insights }) => {
  if (!insights) return null;

  const recommendationData = [
    {
      title: 'Fitness Insights',
      recommendation: insights.fitness_insights.steps_prediction.recommendation,
      trend: insights.fitness_insights.steps_prediction.trend,
      nextPrediction: insights.fitness_insights.steps_prediction.next_prediction,
      icon: <DirectionsRunIcon sx={{ color: '#28A745' }} />,
      color: '#28A745'
    },
    {
      title: 'Heart Rate Monitoring',
      recommendation: insights.fitness_insights.heart_rate_prediction.recommendation,
      trend: insights.fitness_insights.heart_rate_prediction.trend,
      nextPrediction: insights.fitness_insights.heart_rate_prediction.next_prediction,
      icon: <FavoriteIcon sx={{ color: '#DC3545' }} />,
      color: '#DC3545'
    },
    {
      title: 'Sleep Optimization',
      recommendation: insights.sleep_insights.recommendation,
      icon: <SleepIcon sx={{ color: '#4A90E2' }} />,
      color: '#4A90E2'
    }
  ];

  const parseHolisticInsights = () => {
    const insights = [
      { 
        label: 'Fitness Dynamics', 
        color: 'primary',
        icon: <DirectionsRunIcon fontSize="small" />
      },
      { 
        label: 'Sleep Quality', 
        color: 'secondary',
        icon: <SleepIcon fontSize="small" />
      },
      { 
        label: 'Emotional State', 
        color: 'success',
        icon: <MoodIcon fontSize="small" />
      }
    ];

    return insights;
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <WarningIcon sx={{ mr: 2, color: 'warning.main' }} />
          <Typography variant="h5">Health Recommendations</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        {recommendationData.map((recommendation, index) => (
          <RecommendationCard key={index} {...recommendation} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1
            }}
          >
            <Box display="flex" alignItems="center" mb={1.5}>
              <HealthAndSafetyIcon 
                sx={{ 
                  mr: 2, 
                  color: 'text.secondary'
                }} 
              />
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                Holistic Health Recommendation
              </Typography>
            </Box>

            <Box display="flex" flexWrap="wrap" mb={1.5}>
              {parseHolisticInsights().map((insight) => (
                <Chip
                  key={insight.label}
                  label={insight.label}
                  color={insight.color}
                  size="small"
                  icon={insight.icon}
                  sx={{ 
                    mr: 1,
                    mb: 1,
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>

            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                lineHeight: 1.6,
                pl: 1
              }}
            >
              {insights.holistic_recommendation}
            </Typography>
          </Box>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RecommendationSection;