import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Rating,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import logo from "../assets/images/logo.png";
import feedbackIllustration from "../assets/images/feedback.jpg";

const Feedback = () => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //     setUser(JSON.parse(storedUser));
    // } else {
    setUser({ id: 1, name: "John Doe" }); // For testing purposes
    // }
  }, []);

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
      userId: user.id,
      ratings,
      comments,
    };
    try {
      await axios.post("http://localhost:5000/api/feedback", feedback);
      alert("Feedback submitted successfully!");
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
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <Box sx={{ bgcolor: "black", minHeight: "100vh", padding: "20px" }}>
      <Grid container spacing={0} sx={{ height: "100%", color: "white" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            height: "100%",
            padding: "20px",
            position: "relative",
            borderRadius: "20px",
            marginTop:'50px'
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              animation: "fadeIn 3s ease-in-out",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: 0,
                    transform: "scale(0.9)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              }}
            >
              Provide your valuable feedback and ratings
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Help us improve by sharing your thoughts and experiences.
            </Typography>
          </Box>
          <Box
            component="img"
            src={feedbackIllustration}
            alt="Feedback Illustration"
            sx={{
              width: "80%",
              mt: 4,
              animation: "bounceIn 3s ease-in-out",
              "@keyframes bounceIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
              borderRadius: "20px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Container maxWidth="md">
              <Card
                sx={{
                  padding: 3,
                  borderRadius: 4,
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.7)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  mb={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    ml: 2,
                    width: "100%",
                  }}
                >
                  <img
                    src={logo}
                    alt="MindWell"
                    style={{ width: 350, height: 200, justifyContent: "center" }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  gutterBottom
                  align="center"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  System Feedback
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6" gutterBottom>

                   <center>Rate the following aspects out of 5 stars:</center> 
                  </Typography>

                  <Card sx={{ mb: 3, borderRadius: 2, backgroundColor: "rgba(255, 255, 255, 0.2)",color:"white" }}>
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
                        <Box key={index} mb={2}>
                          <Typography>{item.label}</Typography>
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

                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      type="submit"
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
                      Submit
                    </Button>
                  </Box>
                </form>
              </Card>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Feedback;
