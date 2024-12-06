import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorBookingCard = ({ doctor }) => {
  const token = localStorage.getItem("auth");
  const doctorId = doctor._id;
  const navigate = useNavigate();
  const { timeSlots, appointmentFee, name, avatar } = doctor;

  const [selectedSlot, setSelectedSlot] = useState(null); // Use slot for tracking selection
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleVideoCalling = () => navigate(`/remote-counselling/appointments`);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot before booking.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/checkout-session/${doctorId}`,
        { slot: selectedSlot },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data?.session?.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed in appointment booking.";
      toast.error(errorMsg, { position: "top-center", autoClose: 5000 });
    } finally {
      setLoading(false);
      handleDialogClose();
    }
  };

  return (
    <Card sx={{ padding: 3, marginTop: 4, boxShadow: 4, maxWidth: "40rem", height:"30rem", overflow:'auto' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
          <Avatar
            alt={name}
            src={avatar.url || "/default-avatar.png"}
            sx={{ width: 80, height: 80 }}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="h5">{name}</Typography>
        </Grid>
      </Grid>

      <CardContent>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Consultation Fee: <b>Rs{appointmentFee}</b>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Available Time Slots
        </Typography>

        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1"><strong>{slot.day}</strong></Typography>
                <Typography variant="body2">
                  {new Date(slot.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(slot.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
              <Button
                variant={selectedSlot === slot ? "contained" : "outlined"}
                size="large"
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.available
                  ? selectedSlot === slot
                    ? "Selected"
                    : "Select"
                  : "Unavailable"}
              </Button>
            </Stack>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No available slots.
          </Typography>
        )}

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !selectedSlot}
            onClick={() => setDialogOpen(true)}
          >
            {loading ? <CircularProgress size={24} /> : "Book Appointment"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleVideoCalling}
          >
            Start Video Call
          </Button>
        </Stack>
      </CardContent>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to book an appointment with Dr. {name} for the
            selected slot:{" "}
            <b>
              {selectedSlot?.day} {selectedSlot?.startTime} -{" "}
              {selectedSlot?.endTime}
            </b>
            .
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleBooking} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Confirm Booking"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DoctorBookingCard;
