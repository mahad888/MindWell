import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import DoctorLayout from '../../components/Layout/DoctorLayout';
import axios from 'axios';
import { setAppointments } from '../../Redux/reducers/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', appointments: 30 },
  { name: 'Feb', appointments: 40 },
  { name: 'Mar', appointments: 28 },
  { name: 'Apr', appointments: 50 },
  { name: 'May', appointments: 60 },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAppointments = () => {
    navigate('/doctor/appointments');
  };

  const handelPatients = () => {
    navigate('/doctor/registered-patients');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem('auth');
  const [appointments, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch appointment details
        const { data } = await axios.get('http://localhost:5000/api/doctor/appointments', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.bookings) {
          setAppointmentsData(data.bookings);
          dispatch(setAppointments(data.bookings));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, dispatch]);

  return (
    <DoctorLayout>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Grid container spacing={3}>
            {/* Upcoming Appointments Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6">Upcoming Appointments</Typography>
              {appointments.length > 0 ? (
                appointments.slice(0, 2).map((booking, index) => (
                  <Card key={index} style={{ marginBottom: '10px' }}>
                    <CardContent>
                      <Typography variant="body1">
                        Patient: {booking.patient?.name || 'N/A'}
                      </Typography>
                      <Typography variant="body2">Date: {new Date(booking?.timeSlot?.day).toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2">No upcoming appointments.</Typography>
              )}
              <Button variant="outlined" onClick={handleAppointments} style={{ marginTop: '10px' }}>
                View All
              </Button>
            </Grid>

            {/* Performance Overview Chart */}
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Performance Overview</Typography>
                  <LineChart width={500} height={300} data={data}>
                    <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Patient List - Updated to show upcoming appointments */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Patient List (Upcoming Appointments)</Typography>
                  {appointments.length > 0 ? (
                    appointments.slice(0, 3).map((booking, index) => (
                      <Typography key={index} variant="body1" style={{ marginBottom: '5px' }}>
                        {index + 1}. {booking.patient?.name || 'N/A'}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No patients found.</Typography>
                  )}
                  <Button variant="outlined" onClick={handelPatients} style={{ marginTop: '10px' }}>
                    View All Patients
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Patient Details Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Name: John Doe</Typography>
              <Typography variant="body1">Age: 45</Typography>
              <Typography variant="body1">Condition: Diabetes</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </DoctorLayout>
  );
};

export default Dashboard;
