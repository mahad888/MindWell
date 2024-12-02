import React, { useCallback } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useInputValidation } from "6pp";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { DoctorHeader } from "../../components/Layout/DoctorLayout";

const VideoCounselling = () => {
  const code = useInputValidation("");
  const navigate = useNavigate();
  const {meetingCode} = useParams();

  const handleJoinRoom = useCallback(() => {
    if (code.value === meetingCode) {
      navigate(`/room/${code.value}`);
    } else {
      toast.error("Incorrect code. Please enter the correct meeting code displayed above.");
    }
  }, [navigate, code.value, meetingCode]);

  const { user } = useSelector((state) => state.auth);
  const isPatient = user.role === "patient";
  const isDoctor = user.role === "doctor";

  return (
    <React.Fragment>
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        
        padding: "20px",
      }}
    >

      <Paper
        elevation={6}
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#4c8bf5",
            fontWeight: "bold",
          }}
        >
          Video Counselling
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "10px",
            color: "#6a4ce9",
          }}
        >
          Please enter the code below to join the meeting at your booked slot.
        </Typography>

        {/* Static Code Display */}
        <Typography
          variant="h5"
          sx={{
            background: "linear-gradient(135deg, #6a4ce9, #4c8bf5)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          {meetingCode}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            label="Enter room code"
            variant="outlined"
            value={code.value}
            onChange={code.changeHandler}
            sx={{
              width: { xs: "100%", sm: "70%" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
              },
              "& .MuiInputLabel-root": {
                color: "#6a4ce9",
              },
            }}
          />

          <Button
            onClick={handleJoinRoom}
            variant="contained"
            sx={{
              padding: "10px 25px",
              background: "linear-gradient(135deg, #4c8bf5, #6a4ce9)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "25px",
              transition: "all 0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, #6a4ce9, #4c8bf5)",
              },
            }}
          >
            Join
          </Button>
        </Box>
      </Paper>
    </Stack>
  </React.Fragment>
  );
};

export default VideoCounselling;
