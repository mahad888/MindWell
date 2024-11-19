import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../Redux/reducers/auth";
import toast from "react-hot-toast";
import axios from "axios";

// DoctorCard Component
const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); // Moved useNavigate inside the component
  const token = localStorage.getItem('auth');
  const dispatch = useDispatch()
  const [totalRating, setTotalRating] = useState([])
  const [avgRating, setAvgRating] = useState([])
  const [totalPatients, setTotalPatients] = useState([])
  const doctorId = doctor._id;




  const handleNavigate = () => {
    navigate(`/doctor/${doctor._id}`);
  };

  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/feedback/${doctorId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        if (response.status === 200) {

          dispatch(setFeedback(response?.data || []));
          setTotalRating(response?.data.totalRating)
          setAvgRating(response?.data.avgRating)

        
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        toast.error('Failed to fetch reviews.', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    if (doctor) {
      fetchReviews();
    }
  }, [doctor]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "15px",
        boxShadow: 5,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={doctor?.avatar?.url}
        alt={doctor.name}
        sx={{ borderRadius: "15px 15px 0 0", cursor: "pointer" }}
        onClick={handleNavigate}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {doctor.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Specialization: {doctor?.specialization || "N/A"}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Rating value={avgRating} readOnly precision={0.5} />
          <Typography variant="body2" color="textSecondary">
            ({totalRating} ratings)
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Total Patients: {doctor.totalPatients}
        </Typography>
      </CardContent>
    </Card>
  );
};

// DoctorCardsGrid Component to display multiple cards
const DoctorCardsGrid = ({ doctors }) => {
  return (
    <Grid container spacing={3} padding={10}>
      {doctors.map((doctor, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <DoctorCard doctor={doctor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorCardsGrid;
