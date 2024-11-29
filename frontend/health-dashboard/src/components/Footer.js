import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#00363a', 
        color: '#ffffff', 
        textAlign: 'center', 
        padding: '15px',
        marginTop: 'auto'
      }}
    >
      <Typography variant="body2" color="inherit">
        © {new Date().getFullYear()} Health Dashboard | {' '}
        <Link 
          href="#" 
          color="secondary" 
          sx={{ 
            color: '#ffd54f', 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Documentation
        </Link>{' | '}
        <Link 
          href="#" 
          color="secondary" 
          sx={{ 
            color: '#ffd54f', 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          FAQs
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;