import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip 
} from '@mui/material';
import { motion } from 'framer-motion';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  trend, 
  color, 
  recommendation 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.03)'
        }
      }}
    >
      <CardContent sx={{ flex: 1 }}>
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
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">
            {value} {unit}
          </Typography>
          
          {trend && (
            <Chip
              icon={trend === 'increasing' ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={trend}
              color={trend === 'increasing' ? 'success' : 'warning'}
              size="small"
            />
          )}
        </Box>

        {recommendation && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mt: 1, fontStyle: 'italic' }}
          >
            {recommendation}
          </Typography>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const MetricsOverview = ({ metrics, insights }) => {
  // Get the latest metrics
  const latestMetrics = metrics[metrics.length - 1] || {};
  const fitnessInsights = insights?.fitness_insights || {};

  const metricsData = [
    {
      title: 'Daily Steps',
      value: latestMetrics.steps || 0,
      unit: 'steps',
      icon: <DirectionsRunIcon sx={{ color: '#28A745' }} />,
      color: '#28A745',
      trend: fitnessInsights.steps_prediction?.trend,
      recommendation: fitnessInsights.steps_prediction?.recommendation
    },
    {
      title: 'Heart Rate',
      value: latestMetrics.heart_rate || 0,
      unit: 'BPM',
      icon: <FavoriteIcon sx={{ color: '#DC3545' }} />,
      color: '#DC3545',
      trend: fitnessInsights.heart_rate_prediction?.trend,
      recommendation: fitnessInsights.heart_rate_prediction?.recommendation
    },
    {
      title: 'Sleep Duration',
      value: latestMetrics.sleep_hours?.toFixed(1) || 0,
      unit: 'hrs',
      icon: <TimerIcon sx={{ color: '#4A90E2' }} />,
      color: '#4A90E2',
      recommendation: insights?.sleep_insights?.recommendation
    }
  ];

  return (
    <Grid container spacing={3}>
      {metricsData.map((metric, index) => (
        <Grid item xs={12} md={4} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsOverview;