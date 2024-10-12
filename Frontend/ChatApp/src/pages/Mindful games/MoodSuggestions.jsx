import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MoodSuggestions = ({ mood, suggestions }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6">Suggestions for Feeling {mood}:</Typography>
            {suggestions.map((suggestion, index) => (
                <Paper key={index} elevation={2} style={{ padding: '10px', marginTop: '10px' }}>
                    {suggestion}
                </Paper>
            ))}
        </Box>
    );
};

export default MoodSuggestions;
