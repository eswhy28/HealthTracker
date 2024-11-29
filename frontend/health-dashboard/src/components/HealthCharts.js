import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box 
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

const HealthCharts = ({ metrics, sleep, journal }) => {
  // Prepare data for charts
  const chartData = metrics.map((metric, index) => ({
    date: moment(metric.date).format('MM/DD'),
    steps: metric.steps,
    heart_rate: metric.heart_rate,
    sleep_quality: sleep[index]?.sleep_quality,
    sleep_duration: sleep[index]?.duration
  }));

  return (
    <Grid container spacing={3}>
      {/* Steps and Heart Rate Chart */}
      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity and Heart Rate
              </Typography>
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
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Sleep Quality and Duration Chart */}
      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sleep Analysis
              </Typography>
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
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HealthCharts;