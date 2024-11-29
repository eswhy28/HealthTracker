import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Header from './components/Header';
import HealthDashboard from './components/HealthDashboard';
import Footer from './components/Footer';
import { fetchMetrics } from './utils/api';

const App = () => {
  const [metrics, setMetrics] = useState([]);
  const [dateRange, setDateRange] = useState({ 
    start: dayjs().subtract(7, 'days').format('YYYY-MM-DD'), 
    end: dayjs().format('YYYY-MM-DD') 
  });

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await fetchMetrics(dateRange);
      setMetrics(data);
    };

    loadMetrics();
  }, [dateRange]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f4f6f9'
    }}>
      <Header />
      <main style={{ 
        flexGrow: 1, 
        padding: '20px', 
        maxWidth: '1200px', 
        width: '100%', 
        margin: '0 auto' 
      }}>
        <HealthDashboard metrics={metrics} />
      </main>
      <Footer />
    </div>
  );
};

export default App;