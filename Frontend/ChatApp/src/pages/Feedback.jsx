import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Rating,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MindWellAppLayout from "../components/Layout/MindWellApplayout";
import { setIsFeedback } from "../Redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Feedback = () => {
  const [ratings, setRatings] = useState({
    ui: 0,
    navigation: 0,
    assessment: 0,
    aiAssessment: 0,
    exercises: 0,
    chat: 0,
    scheduling: 0,
    tracking: 0,
    progressVisuals: 0,
    community: 0,
    communityWall: 0,
    overall: 0,
    recommend: 0,
  });
  const [comments, setComments] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch= useDispatch()
  const {isFeedback} = useSelector(state=>state.misc)

  const {user} = useSelector(state=>state.auth)
  const handleRatingChange = (event, newValue, name) => {
    setRatings((prevRatings) => ({ ...prevRatings, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in");
      return;
    }
    const feedback = {
      user: user._id,
      ratings,
      comments,
    };
    const token = localStorage.getItem("auth");
    try {
      await axios.post("http://localhost:5000/api/feedback", feedback,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Feedback submitted successfully");
      setRatings({
        ui: 0,
        navigation: 0,
        assessment: 0,
        aiAssessment: 0,
        exercises: 0,
        chat: 0,
        scheduling: 0,
        tracking: 0,
        progressVisuals: 0,
        community: 0,
        communityWall: 0,
        overall: 0,
        recommend: 0,
      });
      setComments("");
      setOpen(false); // Close dialog after successful submission
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch( setIsFeedback(false))
  };

  return (

      <Dialog open={isFeedback} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h4" align="center">
            System Feedback
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="h6" gutterBottom align="center">
            Rate the following aspects out of 5 stars:
          </Typography>

          <Card
  sx={{
    mb: 3,
    borderRadius: 2,
    backgroundColor: "#f5f5f5", // Use a solid background color for better contrast
    color: "black", // Ensure text is visible on a lighter background
  }}
>
  <CardContent>
    {[
      { label: "Overall User Interface", name: "ui" },
      { label: "Ease of Navigation", name: "navigation" },
      {
        label: "Mental Health Assessment Questionnaires",
        name: "assessment",
      },
      {
        label: "AI-Powered Assessments and Emotion Recognition",
        name: "aiAssessment",
      },
      {
        label: "Mindfulness Meditation and Breathing Exercises",
        name: "exercises",
      },
      { label: "Real-time Chat with Doctors", name: "chat" },
      {
        label: "Appointment Scheduling and Management",
        name: "scheduling",
      },
      { label: "Progress Tracking Tools", name: "tracking" },
      {
        label: "Visual Representations of Progress",
        name: "progressVisuals",
      },
      {
        label: "Peer Support and Community Building",
        name: "community",
      },
      {
        label: "Community Wall Posts and Interactions",
        name: "communityWall",
      },
      { label: "Overall Experience", name: "overall" },
      { label: "Recommendation Likelihood", name: "recommend" },
    ].map((item, index) => (
      <Box key={index} mb={2} direction={'row'}>
        <Typography color="black"> {/* Ensure text is visible */}
          {item.label}
        </Typography>
        <Rating
          name={item.name}
          value={ratings[item.name]}
          onChange={(event, newValue) =>
            handleRatingChange(event, newValue, item.name)
          }
        />
      </Box>
    ))}
  </CardContent>
</Card>

          <Card sx={{ mb: 3, borderRadius: 2, backgroundColor: "white" }}>
            <CardContent>
              <TextField
                label="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "#4C7E80",
              fontSize: "16px",
              height: "50px",
              color: "white",
              padding: "10px 20px",
              borderRadius: "20px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
            }}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default Feedback;
