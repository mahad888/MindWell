import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Stack } from '@mui/material';
import AppointmentCardGrid from '../../components/RemoteCounseling/AppointmentCardGrid';
import RemoteCounsellingLayout from '../../components/Layout/RemoteCounsellingLayout';

const MyAppointment = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`http://localhost:5000/api/appointments`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointment(data.bookings);
      } catch (err) {
        console.error(err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // For debugging purposes
  useEffect(() => {
    console.log('Updated Appointments:', appointment);
  }, [appointment]);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!appointment || appointment.length === 0) {
    return (
      <Typography
        color="textSecondary"
        variant="h6"
        align="center"
        marginTop="2rem"
      >
        No appointments available.
      </Typography>
    );
  }

  return <AppointmentCardGrid appointments={appointment} />;
};

export default RemoteCounsellingLayout(MyAppointment);
