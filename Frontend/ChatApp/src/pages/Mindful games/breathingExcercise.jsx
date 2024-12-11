import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Slider, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // Import the ArrowBack icon
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import MindWellAppLayout from "../../components/Layout/MindWellApplayout";

const BreathingGame = () => {
  const [stage, setStage] = useState("Breathe In");
  const [balloonSize, setBalloonSize] = useState(1);
  const [stageIndex, setStageIndex] = useState(0);
  const [timer, setTimer] = useState(4); // Initial timer for 'Breathe In'
  const [totalTime, setTotalTime] = useState(0); // Session timer
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate(); // Initialize the navigate function

  const stages = [
    { name: "Breathe In", duration: 4000, size: 2 },
    { name: "Hold", duration: 2000, size: 2 },
    { name: "Breathe Out", duration: 4000, size: 1 },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalTime((prev) => prev + 1); // Increment total time every second
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => (prev > 1 ? prev - 1 : stages[stageIndex].duration / 1000)); // Countdown
    }, 1000);

    const breathingCycle = setTimeout(() => {
      const nextIndex = (stageIndex + 1) % stages.length;
      setStageIndex(nextIndex);
      setStage(stages[nextIndex].name);
      setBalloonSize(stages[nextIndex].size);
      setTimer(stages[nextIndex].duration / 1000);
    }, stages[stageIndex].duration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(breathingCycle);
    };
  }, [stageIndex]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <MindWellAppLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: theme === "light" ? "#f5f5f5" : "#2c3e50",
          transition: "background 0.5s ease",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 600,
            mx: "auto",
            textAlign: "center",
            background: theme === "light" ? "#ffffff" : "#34495e",
            color: theme === "light" ? "#000000" : "#ecf0f1",
            borderRadius: "15px",
            boxShadow: theme === "light" ? "0 4px 10px rgba(0,0,0,0.2)" : "0 4px 15px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
<IconButton
  aria-label="Go Back"
  sx={{
    position: "absolute",
    top: 16,
    left: 16,
    color: theme === "light" ? "#000" : "#ecf0f1",
    marginBottom: "2rem",
  }}
  onClick={() => navigate(-1)} // Navigate to the previous route
>
  <ArrowBack />
</IconButton>


          <Typography variant="h4" gutterBottom mt={2}>
            Guided Breathing Exercise
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {stage}
          </Typography>

          {/* Timer and Progress */}
          <Typography variant="body1">Time Remaining: {timer} seconds</Typography>
          <Box sx={{ my: 2 }}>
            <Slider
              value={(stageIndex / stages.length) * 100}
              sx={{
                color: theme === "light" ? "#4caf50" : "#ecf0f1",
                height: 10,
                borderRadius: 5,
              }}
            />
          </Box>

          {/* Balloon Animation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <motion.div
              animate={{ scale: balloonSize }}
              transition={{ duration: 1 }}
              style={{
                backgroundColor: "#ff9800",
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
              }}
            />
          </Box>

          {/* Total Time */}
          <Typography sx={{ mt: 2 }}>Session Time: {totalTime} seconds</Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setStageIndex(0);
                setStage("Breathe In");
                setBalloonSize(1);
                setTotalTime(0);
              }}
            >
              Restart
            </Button>
            <Button variant="contained" color="secondary" onClick={toggleTheme}>
              Toggle Theme
            </Button>
          </Box>
        </Paper>
      </Box>
    </MindWellAppLayout>
  );
};

export default BreathingGame;
