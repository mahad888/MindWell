import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, CardActions } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import a UUID library

const PaymentSuccessPage = () => {
    const token = localStorage.getItem("auth");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Extract query parameters
    const doctorId = queryParams.get("doctorId");
    const day = queryParams.get("day");
    const startTime = queryParams.get("startTime");
    const endTime = queryParams.get("endTime");
    const _id = queryParams.get("_id");

    // Create the slot object
    const slot = {
        day,
        startTime,
        endTime,
        _id,
    };

    // Track booking status
    const [isBookingSaved, setIsBookingSaved] = useState(false);

    useEffect(() => {
        const saveBooking = async () => {
            if (isBookingSaved) return; // Prevent multiple saves

            const idempotencyKey = localStorage.getItem("idempotencyKey") || uuidv4(); // Generate a key
            localStorage.setItem("idempotencyKey", idempotencyKey); // Save key for reuse

            try {
                const response = await axios.post(
                    `http://localhost:5000/api/booking/appointment/${doctorId}`,
                    { slot },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "Idempotency-Key": idempotencyKey, // Pass the key in the header
                        },
                    }
                );
                console.log("Booking saved:", response.data);

                // Mark booking as saved
                setIsBookingSaved(true);
            } catch (error) {
                console.error("Error saving booking:", error);
            }
        };

        saveBooking();
    }, [isBookingSaved, doctorId, token, slot]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    textAlign: "center",
                    padding: 3,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            >
                <CheckCircleOutlineIcon
                    sx={{
                        fontSize: 80,
                        color: "green",
                        marginBottom: 2,
                    }}
                />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Payment Successful!
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Thank you for your payment. Your transaction was successfully processed.
                </Typography>

                <CardContent>
                    <Box sx={{ textAlign: "left", marginY: 2 }}></Box>
                </CardContent>

                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                        onClick={() => (window.location.href = "/mind-well")}
                    >
                        Back to Home
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                        onClick={() => (window.location.href = "/remote-counselling/appointments")}
                    >
                        View Appointments
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default PaymentSuccessPage;
