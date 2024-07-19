import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const DashboardContent = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Welcome to MindWell</Typography>
          <Typography variant="body1">Your mental health journey starts here.</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Upcoming Appointments</Typography>
          <Typography variant="body1">You have 2 appointments this week.</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Recent Activities</Typography>
          <Typography variant="body1">You've completed 3 mindfulness sessions this week.</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Progress Overview</Typography>
          <Typography variant="body1">Track your progress and stay motivated!</Typography>
          {/* Add a chart or progress tracker here */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
