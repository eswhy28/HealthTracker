import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Box, 
  CircularProgress,
  TextField,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

import { 
  fetchHealthInsights, 
  fetchMetrics, 
  fetchSleep, 
  fetchJournal 
} from '../utils/api';

import MetricsOverview from './MetricsOverview';
import HealthCharts from './HealthCharts';
import RecommendationSection from './RecommendationSection';
import JournalSection from './JournalSection';

const HealthDashboard = () => {
  const [insights, setInsights] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment());

  const loadHealthData = async () => {
    try {
      setLoading(true);
      const [
        insightsData, 
        metricsData, 
        sleepData, 
        journalData
      ] = await Promise.all([
        fetchHealthInsights(startDate, endDate),
        fetchMetrics({ 
          start_date: startDate.format('YYYY-MM-DD'), 
          end_date: endDate.format('YYYY-MM-DD') 
        }),
        fetchSleep({ 
          start_date: startDate.format('YYYY-MM-DD'), 
          end_date: endDate.format('YYYY-MM-DD') 
        }),
        fetchJournal({ 
          start_date: startDate.format('YYYY-MM-DD'), 
          end_date: endDate.format('YYYY-MM-DD') 
        })
      ]);

      setInsights(insightsData);
      setMetrics(metricsData);
      setSleep(sleepData);
      setJournal(journalData);
    } catch (error) {
      console.error('Failed to load health data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHealthData();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <Container 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <CircularProgress color="primary" size={80} />
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" fontWeight="bold">
                Personal Health Dashboard
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </Stack>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MetricsOverview 
                  metrics={metrics} 
                  insights={insights} 
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <HealthCharts 
                  metrics={metrics}
                  sleep={sleep}
                  journal={insights}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <RecommendationSection insights={insights} />
                  <JournalSection journal={journal} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
};

export default HealthDashboard;