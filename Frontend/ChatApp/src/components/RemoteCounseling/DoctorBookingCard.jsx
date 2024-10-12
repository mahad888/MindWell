import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const DoctorBookingCard = ({ doctor }) => {
  return (
    <Card sx={{ padding: 2, marginTop: 4 }}>
      <CardContent>
        <Typography variant="h6">Consultation Fee: ${doctor?.ticketPrice}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Available Slots: {doctor?.availableSlots?.join(', ')}
        </Typography>
        <Button variant="contained" color="primary">
          Book an Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorBookingCard;
