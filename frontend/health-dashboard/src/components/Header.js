import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(135deg, #00796B, #004D40)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700, 
            letterSpacing: '0.5px',
            color: 'white'
          }}
        >
          Health Metrics Dashboard
        </Typography>
        <div>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;