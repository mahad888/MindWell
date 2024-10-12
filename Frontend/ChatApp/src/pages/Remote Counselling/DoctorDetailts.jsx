import React, { useEffect, useState } from "react";
import { Stack, Grid, CircularProgress } from "@mui/material";
import DoctorProfile from "../../components/RemoteCounseling/DoctorProfile";
import AboutDoctor from "../../components/RemoteCounseling/AboutDoctor";
import DoctorFeedback from "../../components/RemoteCounseling/DoctorFeedBack";
import DoctorBookingCard from "../../components/RemoteCounseling/DoctorBookingCard";
import { useParams } from "react-router-dom";
import RemoteCounsellingLayout from "../../components/Layout/RemoteCounsellingLayout";
import axios from "axios";

const DoctorDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("auth");

  const [doctor, setDoctor] = useState(null); // Store doctor data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch doctor details from the server
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/getDoctor/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(data.Doctor); // Update doctor state
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchDoctorDetails(); // Fetch data if ID and token are available
    }
  }, [id, token]);

  const handleAddReview = (review) => {
    // Add review to the doctor's feedback (You can expand on this logic)
  };

  // Conditional rendering: loading, error, or content
  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!doctor) {
    return <p>No doctor found</p>; // Fallback if no doctor data
  }

  return (
    <Stack spacing={4} sx={{ padding: { xs: "1rem", md: "2rem" } }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <DoctorProfile doctor={doctor} />
          <AboutDoctor doctor={doctor} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DoctorBookingCard doctor={doctor} />
        </Grid>
      </Grid>
      <DoctorFeedback doctor={doctor} onAddReview={handleAddReview} />
    </Stack>
  );
};

export default RemoteCounsellingLayout(DoctorDetails);
