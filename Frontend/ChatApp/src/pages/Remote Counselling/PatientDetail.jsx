import {
  Avatar,
  Grid,
  Stack,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PatientReports from "./PatientReports";
import DoctorLayout from "../../components/Layout/DoctorLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PatientDetail = () => {
  const { id,appointmentId } = useParams();
  const token = localStorage.getItem("auth");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [negativeMessagesCount, setNegativeMessagesCount] = useState(0);
  const [neutralMessagesCount, setNeutralMessagesCount] = useState(0);
  const [negativePostsCount, setNegativePostsCount] = useState(0);
  const [neutralPostsCount, setNeutralPostsCount] = useState(0);
  const navigate = useNavigate();
  const appointments = useSelector((state) => state.auth.appointments);
  let appointment = appointments.find((appointment) => appointment._id === appointmentId);
  const handleNavigate = () => {
    // Navigate to the video counselling page
    navigate(`/video-counselling/${appointment?.meetingCode }`);
    };

    const [dialogOpen, setDialogOpen] = useState(false);

    // Open the dialog
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
  
    // Close the dialog
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    // Handle marking the appointment as completed
    
    const handleMarkAsCompleted = async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/update-booking-status/${appointmentId}`,
          { status: "completed" },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Appointment status updated to Completed!");
        setDialogOpen(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update appointment status.");
      }
      navigate("/doctor/appointments");
    };



  useEffect(() => {
    const fetchPatientReports = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/doctor/patient/assessments/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const messages = await axios.get(
          `http://localhost:5000/api/doctor/patient/messages/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const posts = await axios.get(
          `http://localhost:5000/api/doctor/patient/posts/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReports(data.assessment.reverse());
        setNegativeMessagesCount(messages.data.negativeMessages);
        setNeutralMessagesCount(messages.data.neutralMessages);
        setNegativePostsCount(posts.data.negativePosts);
        setNeutralPostsCount(posts.data.neutralPosts);
      } catch (err) {
        console.error(err);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientReports();
  }, [id, token]);

  if (loading) {
    return (
      <DoctorLayout>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Stack>
      </DoctorLayout>
    );
  }

  if (error) {
    return (
      <DoctorLayout>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Typography color="error">{error}</Typography>
        </Stack>
      </DoctorLayout>
    );
  }

  // Data for the graphs
  const postsData = [
    { type: "Negative Posts", count: negativePostsCount },
    { type: "Neutral Posts", count: neutralPostsCount },
  ];

  const messagesData = [
    { type: "Negative Messages", count: negativeMessagesCount },
    { type: "Neutral Messages", count: neutralMessagesCount },
  ];

  return (
    <DoctorLayout>
      <Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                marginTop: "2rem",
              }}
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={appointment?.patient?.avatar?.url || ""}
                alt={appointment?.patient.name || "Patient Avatar"}
              />
              <Typography variant="h6">
                {appointment.patient.name || "Unknown Patient"}
              </Typography>
            </Box>
            <PatientReports reports={reports} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "3rem",
                // Ensures the Box takes the full height of the screen
              }}
            >
              <Button
                sx={{
                  background: "linear-gradient(135deg, #6a4ce9, #4c8bf5)",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4c8bf5, #6a4ce9)",
                  },
                }}
                onClick={handleNavigate}
              >
                Start Video Counselling
              </Button>
              <Button
              
              spacing="1rem"
               variant="outlined"
                sx={{
                  background: "secondary",
              
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "primary",
                  },
                  marginLeft:"1rem"
                }}
                onClick={handleDialogOpen}
              >
                Mark as Completed
              </Button>
            </Box>
          
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Completion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this appointment as completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleMarkAsCompleted} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
            
            
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                marginTop: "2rem",
              }}
            >
              Posts Data
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "#555", // Adjust color for better visibility
                marginBottom: "1rem",
              }}
            >
              This chart represents the number of negative and neutral posts
              made by the patient over the last week on the MindWell platform.
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={postsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                marginTop: "2rem",
                textAlign: "center",
              }}
            >
              Messages Data
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "#555", // Adjust color for better visibility
                marginBottom: "1rem",
              }}
            >
              This chart shows the number of negative and neutral messages sent
              by the patient in the last week through the MindWell platform.
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messagesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Stack>
    </DoctorLayout>
  );
};

export default PatientDetail;
