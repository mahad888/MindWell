import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AboutDoctor = ({ doctor }) => {
  return (
    <Paper sx={{ padding: 2, marginTop: 3, width: '40rem' }}>
      <Box>
      <Typography variant="h6" gutterBottom>
       <strong>About</strong> 
      </Typography>
      <Typography variant="body1" paragraph>
        {doctor.about}
      </Typography>

      </Box>


      <Typography variant="body1" paragraph>
        <strong>Specialization: </strong>{doctor.specialization}
      </Typography>

      <Typography variant="body1" paragraph>
       <strong>Experience: </strong> {Math.floor(Math.random()*10)} years
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Education:</strong>
      </Typography>
      {doctor.qualifications?.map((edu, index) => (
        <Box key={index} sx={{ marginBottom: 1, paddingLeft: 2 }}>
          <Typography variant="body2">
            <strong>Degree:</strong> {edu.degree}
          </Typography>
          <Typography variant="body2">
            <strong>University:</strong> {edu.university}
          </Typography>
        </Box>
      ))}

      <Typography variant="body1" paragraph>
       <strong> Bio:</strong> {doctor.bio}
      </Typography>
    </Paper>
  );
};

export default AboutDoctor;
