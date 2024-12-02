import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Stack, CircularProgress } from '@mui/material';
import AppointmentCardGrid from '../../components/RemoteCounseling/AppointmentCardGrid';
import DoctorLayout from '../../components/Layout/DoctorLayout';
import { useDispatch } from 'react-redux';
import { setAppointments } from '../../Redux/reducers/auth';

const DoctorAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointment details
        const { data } = await axios.get(`http://localhost:5000/api/doctor/appointments`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointment(data.bookings);
        dispatch(setAppointments(data.bookings));
        console.log(data.bookings);

      } catch (err) {
        console.error(err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <CircularProgress />
    </Stack>
  );

  if (error) return <Typography color="error">{error}</Typography>;

  if (!appointment) return  <Typography>No appointment data available.</Typography>;

  return <AppointmentCardGrid appointments={appointment} />;
};

// Wrapping DoctorAppointment component in DoctorLayout for layout consistency
export default () => <DoctorLayout><DoctorAppointment /></DoctorLayout>;
