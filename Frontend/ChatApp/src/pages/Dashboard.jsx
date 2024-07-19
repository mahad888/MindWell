import React from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MoodIcon from '@mui/icons-material/Mood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import TimelineIcon from '@mui/icons-material/Timeline';
import GamesIcon from '@mui/icons-material/Games';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DashboardContent from './DashboardContent';
import logo from '../assets/images/logo.png'; 

const drawerWidth = 250;

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', 
    },
    secondary: {
      main: '#00796b',
    },
  },
});

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
          { text: 'AI-Powered Assessment', icon: <AssessmentIcon />, path: '/assessment' },
          { text: 'Smart Chatbot', icon: <ChatBubbleOutlineIcon />, path: '/chatbot' },
          { text: 'Emotion Recognition', icon: <MoodIcon />, path: '/emotion-recognition' },
          { text: 'Interactive Exercises', icon: <FitnessCenterIcon />, path: '/interactive-exercises' },
          { text: 'Peer Support', icon: <PeopleIcon />, path: '/peer-support' },
          { text: 'Remote Counselling', icon: <ChatIcon />, path: '/remote-counselling' },
          { text: 'Progress Tracking', icon: <TimelineIcon />, path: '/progress-tracking' },
          { text: 'Mindful Games', icon: <GamesIcon />, path: '/mindful-games' },
          { text: 'Feedback and Ratings', icon: <FeedbackIcon />, path: '/feedback' },
        ].map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <img src={logo} alt="MindWell Logo" style={{ height: '60px', marginRight: '10px' }} /> 
              <Typography variant="h6" noWrap component="div">
                MindWell Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, 
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            
          </Box>
        </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
