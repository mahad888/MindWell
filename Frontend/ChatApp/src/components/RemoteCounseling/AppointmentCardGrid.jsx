import React from 'react'
import { Card, CardContent, Typography, Grid,Button, Stack, Divider, Avatar, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Video } from 'lucide-react';
import VideoCounselling from '../../pages/Remote Counselling/VideoCounselling';

const AppointmentCard = ({appointment}) => {
  const {user} = useSelector((state) => state.auth);
const isPatient = user.role==='patient'
const navigate = useNavigate();
const handleAppointment = () => {
  navigate(`/video-counselling/${appointment?.meetingCode}`)
};

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" align="center" fontWeight="bold">
            Appointment Details
          </Typography>
          <Divider />

          {/* Doctor Details */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={isPatient?appointment?.doctor?.name:appointment.patient.name} src={isPatient?appointment?.doctor?.avatar?.url:appointment?.patient?.avatar?.url} />
            <Typography variant="h6">
              {isPatient?appointment?.doctor?.name:appointment?.patient?.name}
            </Typography>
          </Stack>

          {/* Ticket Price */}
          <Typography variant="body1">
            <strong>Ticket Price:</strong> ${appointment?.ticketPrice}
          </Typography>

          {/* Session and Payment Status */}
          <Typography variant="body1">
            <strong>Session ID:</strong> {appointment?.session}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Status:</strong> {appointment?.isPaid ? 'Paid' : 'Unpaid'}
          </Typography>

          {/* Time Slot (if available) */}
          {/* {appointment?.timeSlot ? (
            <Typography variant="body1">
              <strong>Time Slot:</strong> {appointment?.timeSlot}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Time Slot: Not specified
            </Typography>
          )} */}

          {/* Timestamps */}
          <Typography variant="body2" color="textSecondary">
            <strong>Booked on:</strong> {new Date(appointment?.createdAt).toLocaleString()}
          </Typography>

          <Divider />

          {/* Action Button */}
          <Button variant="contained" color="primary" fullWidth onClick={handleAppointment}>
            View Appointment
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

const AppointmentCardGrid = ({appointments}) => {
  return (

    <Grid container spacing={3} padding={10}>
      {appointments.map((appointments, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <AppointmentCard appointment={appointments} />
        </Grid>
      ))}
    </Grid>
  )
}




export default AppointmentCardGrid