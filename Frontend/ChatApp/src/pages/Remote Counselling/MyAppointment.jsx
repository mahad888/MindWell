import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Stack, Divider, Avatar, CircularProgress } from '@mui/material';
import App from '../../App';
import AppointmentCardGrid from '../../components/RemoteCounseling/AppointmentCardGrid';
import RemoteCounsellingLayout from '../../components/Layout/RemoteCounsellingLayout';

const MyAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointment details
        const {data} = await axios.get(`http://localhost:5000/api/appointments`,{
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },}
        
        )
        setAppointment(data.bookings);
        console.log(appointment)

      } catch (err) {
        console.error(err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return 
  <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
    <CircularProgress />
    </Stack>

  if (error) return <Typography color="error">{error}</Typography>;

  if (appointment?.length<0) return <Typography>No appointment data available.</Typography>;

  return (
    <AppointmentCardGrid appointments={appointment} />

    
  );
};

export default RemoteCounsellingLayout(MyAppointment);
