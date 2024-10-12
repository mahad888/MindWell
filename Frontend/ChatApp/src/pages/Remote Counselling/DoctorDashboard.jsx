import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import DoctorLayout from '../../components/Layout/DoctorLayout';

const data = [
  { name: 'Jan', appointments: 30 },
  { name: 'Feb', appointments: 40 },
  { name: 'Mar', appointments: 28 },
  { name: 'Apr', appointments: 50 },
  { name: 'May', appointments: 60 }
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DoctorLayout>
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={3}>
          {/* Upcoming Appointments Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming Appointments</Typography>
                <Typography>John Doe - 10:30 AM</Typography>
                <Typography>Jane Smith - 11:00 AM</Typography>
                <Button variant="outlined" onClick={handleOpen}>
                  View All
                </Button>
              </CardContent>
            </Card>
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

          {/* Patient List */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Patient List</Typography>
                <Typography>John Doe</Typography>
                <Typography>Jane Smith</Typography>
                <Typography>Michael Brown</Typography>
                <Button variant="outlined" onClick={handleOpen}>
                  View All Patients
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Notifications Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Notifications</Typography>
                <Typography>You have 3 new messages</Typography>
                <Typography>Appointment rescheduled for 1:00 PM</Typography>
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
    </DoctorLayout>
  );
};

export default Dashboard;
