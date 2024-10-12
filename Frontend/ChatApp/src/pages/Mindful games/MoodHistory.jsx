import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const MoodHistory = ({ history }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6">Your Mood History:</Typography>
            <List>
                {history.map((entry, index) => (
                    <ListItem key={index}>
                        <ListItemText 
                            primary={`Mood: ${entry.mood}`} 
                            secondary={`Date: ${new Date(entry.date).toLocaleString()}`} 
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MoodHistory;
