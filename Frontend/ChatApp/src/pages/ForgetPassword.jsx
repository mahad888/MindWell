import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/forgetPassword', { email });
            setMessage(response.data.message);
            
        } catch (error) {
            console.error("Error requesting password reset:", error);
            setMessage("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <Grid container spacing={0} sx={{ height: '100vh',alignItems:"center", justifyContent:"center" }}>
            <Grid item xs={12} md={6}>
                <Container component="main" maxWidth="sm">
                    <Paper elevation={5} sx={{ padding: 4 }}>
                        <Typography component="h1" variant="h5" textAlign="center">
                            Forgot Password
                        </Typography>
                        <form onSubmit={handleForgotPassword} style={{ marginTop: 2 }}>
                            <TextField
                                required
                                fullWidth
                                label="Email Address"
                                margin="normal"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>
                                Request Password Reset
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

export default ForgotPassword;
