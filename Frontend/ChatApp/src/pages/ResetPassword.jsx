import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
    const { id, token } = useParams(); // Capture ID and token from URL parameters
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/auth/resetPassword/${id}/${token}`, { newPassword });
            alert(response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error resetting password:", error);
            setMessage("Failed to reset password. Please try again.");
        }
    };

    return (
        <Grid container spacing={0} sx={{ height: '100vh' }}>
            <Grid item xs={12} md={6}>
                <Container component="main" maxWidth="sm">
                    <Paper elevation={5} sx={{ padding: 4 }}>
                        <Typography component="h1" variant="h5" textAlign="center">
                            Reset Password
                        </Typography>
                        <form onSubmit={handleResetPassword} style={{ marginTop: 2 }}>
                            <TextField
                                required
                                fullWidth
                                label="New Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <TextField
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>
                                Reset Password
                            </Button>
                            {message && (
                                <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
                                    {message}
                                </Typography>
                            )}
                        </form>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;
