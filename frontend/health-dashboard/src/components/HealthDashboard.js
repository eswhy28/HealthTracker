import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Box, 
  CircularProgress ,
  TextField
} from '@mui/material';
import { motion } from 'framer-motion';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
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
  const [dateRange, setDateRange] = useState([
    moment().subtract(7, 'days'), 
    moment()
  ]);

  const loadHealthData = async () => {
    try {
      setLoading(true);
      const [
        insightsData, 
        metricsData, 
        sleepData, 
        journalData
      ] = await Promise.all([
        fetchHealthInsights(dateRange[0], dateRange[1]),
        fetchMetrics({ 
          start_date: dateRange[0].format('YYYY-MM-DD'), 
          end_date: dateRange[1].format('YYYY-MM-DD') 
        }),
        fetchSleep({ 
          start_date: dateRange[0].format('YYYY-MM-DD'), 
          end_date: dateRange[1].format('YYYY-MM-DD') 
        }),
        fetchJournal({ 
          start_date: dateRange[0].format('YYYY-MM-DD'), 
          end_date: dateRange[1].format('YYYY-MM-DD') 
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
  }, []);

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
              <DateRangePicker
                value={dateRange}
                onChange={(newValue) => {
                  setDateRange(newValue);
                  loadHealthData();
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
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
                  journal={journal}
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