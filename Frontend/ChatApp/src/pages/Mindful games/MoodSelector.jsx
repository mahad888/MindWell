import React from 'react';
import { Grid, Button } from '@mui/material';

const MoodSelector = ({ onMoodChange }) => {
    const moods = ['Happy', 'Sad', 'Angry', 'Anxious', 'Calm'];

    return (
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
            {moods.map((mood) => (
                <Grid item key={mood}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => onMoodChange(mood)}
                    >
                        {mood}
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

export default MoodSelector;
