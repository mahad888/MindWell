import React from "react";
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

// DoctorCard Component
const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); // Moved useNavigate inside the component

  const handleNavigate = () => {
    navigate(`/doctor/${doctor._id}`);
  };

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
        image={doctor.avatar.url}
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
          Specialization: {doctor.specialization || "N/A"}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Rating value={doctor.averageRating} readOnly precision={0.5} />
          <Typography variant="body2" color="textSecondary">
            ({doctor.totalRating} ratings)
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
