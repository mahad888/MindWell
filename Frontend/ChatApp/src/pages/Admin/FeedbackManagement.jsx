import AdminLayout from '../../components/Layout/AdminLayout'

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Rating,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepOrange } from "@mui/material/colors";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch all feedback from the backend (Assuming API endpoint exists)
    const token = localStorage.getItem("auth");
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback",{
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        setFeedbacks(response.data)
        console.log(response.data)
      
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <AdminLayout>
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        py: 4,
        px: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Admin Feedback 
      </Typography>

      <Grid container spacing={4}>
        {feedbacks.map((feedback, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
                backgroundColor: "white",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        width: 56,
                        height: 56,
                      }}
                      src={feedback?.user?.avatar?.url} // Assuming avatar exists in feedback
                      alt={feedback?.user?.name}
                    >
                      {feedback.user?.name[0]}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{feedback.user?.name}</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {feedback?.user?.email}
                      </Typography>
                    </Box>
                    <Typography variant="h6">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Divider sx={{ mb: 2 }} />
                  <CardContent>
                    <Stack spacing={2}>
                      {[
                        { label: "Overall User Interface", value: feedback.ratings.ui },
                        { label: "Ease of Navigation", value: feedback.ratings.navigation },
                        {
                          label: "Mental Health Assessment Questionnaires",
                          value: feedback.ratings.assessment,
                        },
                        {
                          label: "AI-Powered Assessments and Emotion Recognition",
                          value: feedback.ratings.aiAssessment,
                        },
                        {
                          label: "Mindfulness Meditation and Breathing Exercises",
                          value: feedback.ratings.exercises,
                        },
                        { label: "Real-time Chat with Doctors", value: feedback.ratings.chat },
                        {
                          label: "Appointment Scheduling and Management",
                          value: feedback.ratings.scheduling,
                        },
                        { label: "Progress Tracking Tools", value: feedback.ratings.tracking },
                        {
                          label: "Visual Representations of Progress",
                          value: feedback.ratings.progressVisuals,
                        },
                        {
                          label: "Peer Support and Community Building",
                          value: feedback.ratings.community,
                        },
                        {
                          label: "Community Wall Posts and Interactions",
                          value: feedback.ratings.communityWall,
                        },
                        { label: "Overall Experience", value: feedback.ratings.overall },
                        { label: "Recommendation Likelihood", value: feedback.ratings.recommend },
                      ].map((item, i) => (
                        <Box key={i}>
                          <Typography variant="body1" fontWeight="bold">
                            {item.label}
                          </Typography>
                          <Rating value={item.value} readOnly />
                        </Box>
                      ))}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body1" fontWeight="bold">
                      Comments
                    </Typography>
                    <Typography variant="body2">{feedback.comments}</Typography>
                  </CardContent>
                </AccordionDetails>
              </Accordion>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </AdminLayout>
  );
};

export default FeedbackManagement
