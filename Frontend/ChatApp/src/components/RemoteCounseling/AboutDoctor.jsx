import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AboutDoctor = ({ doctor }) => {
  return (
    <Paper sx={{ padding: 2, marginTop: 3, width:'40rem'}} >
      <Typography variant="h6" gutterBottom>
        About {doctor.name}
      </Typography>
      <Typography variant="body1" paragraph>
        Experience: {doctor.experience} years
      </Typography>
      <Typography variant="body1" paragraph>
        Education: {doctor.education}
      </Typography>
      <Typography variant="body1" paragraph>
        Bio: {doctor.bio}
      </Typography>
      {/* Add other details as needed */}
    </Paper>
  );
};

export default AboutDoctor;
