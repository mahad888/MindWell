import React from "react";
import RemoteCounsellingLayout from "../../components/Layout/RemoteCounsellingLayout";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/images/rmc1.jpg";
import img2 from "../../assets/images/rmc2.jpeg";
import img3 from "../../assets/images/rmc3.jpeg";
import InfoCards from "../../components/shared/Card";
import FAQSection from "./FAQSection";

const cardData = [
  { 
    title: 'Feeling Lonely', 
    content: 'Loneliness can affect your mental health. Discover ways to reconnect with yourself and others, and learn how to build meaningful relationships that help you feel supported.' 
  },
  { 
    title: 'Stress', 
    content: 'Chronic stress can take a toll on your body and mind. Explore practical techniques to manage stress, such as mindfulness, exercise, and time management.' 
  },
  { 
    title: 'Anxiety', 
    content: 'Anxiety can be overwhelming, but it is manageable. Learn about grounding techniques, breathing exercises, and professional support options to help you regain control.' 
  },
  { 
    title: 'Sadness', 
    content: 'Sadness is a natural emotion, but when it persists, it can lead to depression. Find out how to cope with sadness and seek the help you need to improve your emotional well-being.' 
  },
  { 
    title: 'Overthinking', 
    content: 'Overthinking can trap you in a cycle of worry and indecision. Discover strategies to break free from overthinking, focus on the present moment, and make clearer decisions.' 
  },
  { 
    title: 'Self-Esteem', 
    content: 'Building healthy self-esteem is crucial for a balanced life. Learn how to challenge negative thoughts, set realistic goals, and nurture a positive self-image.' 
  },
  { 
    title: 'Sleep Issues', 
    content: 'Poor sleep can worsen mental health issues. Explore tips for better sleep hygiene, relaxation techniques, and how to establish a sleep routine that works for you.' 
  },
  { 
    title: 'Work-Life Balance', 
    content: 'Balancing work and life can be challenging. Learn how to prioritize, set boundaries, and find time for activities that bring you joy and relaxation.' 
  },
  { 
    title: 'Managing Anger', 
    content: 'Anger is a normal emotion, but it needs to be managed constructively. Discover techniques to express anger healthily and avoid letting it control your actions.' 
  },
];

const RemoteCounselling = () => {
  const navigate = useNavigate();
  const handleAppointment = () => {
    navigate("/doctors");
  };

  return (
    <Stack sx={{ padding: { xs: "1rem", md: "2rem" } }}>
      <Grid container spacing={1} sx={{
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        borderRadius: '16px',
      }}>
        <Grid item xs={12} lg={6}>
          <Stack
            direction="column"
            spacing={3}
            sx={{
              marginLeft: { xs: "1rem", md: "3rem" },
              padding: { xs: "1rem", md: "3rem" },
            }}
          >
            <Box sx={{ flexDirection: "column", maxWidth: "100%" }}>
              <Paper
                elevation={3}
                sx={{
                  padding: { xs: "1rem", md: "2rem" },
                  borderRadius: "20px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
                  }}
                >
                  Healthy Mind, Happy Life We are here to help you to get better.
                </Typography>
                <Typography
                  sx={{
                    marginTop: "1rem",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    fontFamily: "Times New Roman",
                    color: "#000000",
                  }}
                  variant="body1"
                >
                  Strength is not about hiding your struggles, but seeking help to
                  overcome them. We provide a platform where you can talk to our
                  professional therapists and get the help you need. You can book an
                  appointment with our therapists and talk to them online.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "1.5rem",
                    padding: { xs: "0.5rem 1rem", md: "0.5rem 2rem" },
                    borderRadius: "20px",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    backgroundColor: "#007BFF", // Changed to a visible color
                    "&:hover": {
                      backgroundColor: "#7CB9E8",
                    },
                  }}
                  onClick={handleAppointment}
                >
                  Book an Appointment
                </Button>
              </Paper>
            </Box>
          </Stack>
        </Grid>

        <Grid item lg={6} sx={{
          display: {
            xs: "none",
            lg: "block"
          }
        }}>
          <Box
            padding={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img
              src={img1}
              alt="Image 1"
              style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "20px" }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <img
                src={img2}
                alt="Image 2"
                style={{ width: "100%", maxWidth: "200px", height: "auto", borderRadius: "20px" }}
              />
              <img
                src={img3}
                alt="Image 3"
                style={{ width: "100%", maxWidth: "200px", height: "auto", borderRadius: "20px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Stack spacing={3} sx={{ marginTop: "2rem" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
            textAlign: "center",
          }}
        >
          Common Issues We Can Help You With
        </Typography>
        <InfoCards cardData={cardData} />
      </Stack>

      <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
        <Grid item xs={12} lg={6}>
          <FAQSection />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "20px", backgroundColor: "#f5f5f5" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Mental Wellness Tips
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
                color: "#666",
              }}
            >
              Discover daily tips and practices that can help you maintain a healthy mind and balanced life. 
              Start incorporating mindfulness exercises, journaling, and regular self-care routines into your daily life.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RemoteCounsellingLayout(RemoteCounselling);
