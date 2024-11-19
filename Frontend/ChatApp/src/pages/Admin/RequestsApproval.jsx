import AdminLayout from '../../components/Layout/AdminLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Avatar,
  Box,
  Stack,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RequestsApproval = () => {
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem('auth');
  const theme = useTheme(); // For dark/light mode styling

  // Fetch pending doctors
  const fetchPendingDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pendingDoctors', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Approve doctor request
  const approveDoctor = async (doctorId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/approveDoctor/${doctorId}`,
        {request:"approved"},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Doctor approved successfully!');
      fetchPendingDoctors(); // Refresh list
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
  };

  // Cancel doctor request
  const cancelDoctorRequest = async (doctorId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/approveDoctor/${doctorId}`,
        {request:"cancelled"},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          
        }
      );
      alert('Doctor request cancelled!');
      fetchPendingDoctors(); // Refresh list
    } catch (error) {
      console.error('Error cancelling doctor request:', error);
    }
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  return (
    <AdminLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Pending Doctor Approvals
        </Typography>

        {doctors.map((doctor) => (
          <Accordion key={doctor._id} sx={{ mb: 2, borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar 
                  src={doctor.avatar?.url} 
                  alt={doctor.name} 
                  sx={{ width: 56, height: 56 }} 
                />
                <Typography variant="h6">
                  {doctor.name} - {doctor.specialization}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Email: {doctor.email}</Typography>
                  <Typography>Phone: {doctor.phone || 'N/A'}</Typography>
                  <Typography>Appointment Fee: {doctor.apppointmentFee}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Qualifications:
                  </Typography>
                  {doctor.qualifications.map((q, index) => (
                    <Typography key={index}>
                      {q.degree} from {q.university} ({q.startDate} - {q.endDate})
                    </Typography>
                  ))}

                  <Typography variant="h6" gutterBottom mt={2}>
                    Experiences:
                  </Typography>
                  {doctor.experiences.map((exp, index) => (
                    <Typography key={index}>
                      {exp.position} at {exp.hospital} ({exp.startDate} - {exp.endDate})
                    </Typography>
                  ))}
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Time Slots:
              </Typography>
              {doctor.timeSlots.map((slot, index) => (
                <Typography key={index}>
                  {slot.day}: {slot.startTime} - {slot.endTime}
                </Typography>
              ))}

              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => approveDoctor(doctor._id)}
                  startIcon={<CheckCircleIcon />}
                  sx={{ flex: 1 }}
                >
                  Approve Doctor
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => cancelDoctorRequest(doctor._id)}
                  startIcon={<CancelIcon />}
                  sx={{ flex: 1 }}
                >
                  Cancel Request
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </AdminLayout>
  );
};

export default RequestsApproval;
