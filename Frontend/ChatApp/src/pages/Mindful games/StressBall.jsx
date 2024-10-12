// src/components/StressBall.js
import React, { useState } from 'react';
import { Slider, Typography, Box } from '@mui/material';

const StressBall = () => {
  const [pressure, setPressure] = useState(0);

  const handleChange = (event, newValue) => {
    setPressure(newValue);
  };

  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>Virtual Stress Ball</Typography>
      <Box
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#b0bec5',
          borderRadius: '50%',
          margin: '0 auto',
          transform: `scale(${1 + pressure / 100})`,
          transition: 'transform 0.2s ease'
        }}
      />
      <Slider
        value={pressure}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        min={0}
        max={100}
        valueLabelDisplay="auto"
        style={{ marginTop: '20px' }}
      />
    </Box>
  );
};

export default StressBall;
