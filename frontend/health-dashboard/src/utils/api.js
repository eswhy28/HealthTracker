import axios from 'axios';
import moment from 'moment';

const api = axios.create({
  baseURL: '/api', // Relative path for proxy setup
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const fetchHealthInsights = async (startDate, endDate) => {
  try {
    const response = await api.get('/insights/', {
      params: {
        start_date: moment(startDate).format('YYYY-MM-DD'),
        end_date: moment(endDate).format('YYYY-MM-DD')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching health insights:', error);
    throw error;
  }
};

export const fetchMetrics = async (filters) => {
  try {
    const response = await api.get('/metrics/', { 
      params: {
        start_date: filters.start_date,
        end_date: filters.end_date
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

export const fetchSleep = async (filters) => {
  try {
    const response = await api.get('/sleep/', { 
      params: {
        start_date: filters.start_date,
        end_date: filters.end_date
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sleep data:', error);
    throw error;
  }
};

export const fetchJournal = async (filters) => {
  try {
    const response = await api.get('/journal/', { 
      params: {
        start_date: filters.start_date,
        end_date: filters.end_date
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

export default api;