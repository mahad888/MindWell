// src/components/MoodTrackerWithAchievements.js
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, Container } from '@mui/material';

const MoodTracker = () => {
  const [mood, setMood] = useState(''); // State for current mood input
  const [moodEntries, setMoodEntries] = useState([]); // State for storing mood entries
  const [insights, setInsights] = useState(''); // State for mood insights
  const [achievements, setAchievements] = useState([]); // State for achievements

  useEffect(() => {
    if (moodEntries.length > 0) {
      const moodCount = moodEntries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {});

      const sortedMoods = Object.entries(moodCount).sort((a, b) => b[1] - a[1]);
      setInsights(`You are mostly feeling ${sortedMoods[0][0]}`);
    }
  }, [moodEntries]);

  // Calculate achievements based on mood entries
  useEffect(() => {
    const newAchievements = [];

    if (moodEntries.length > 0 && !achievements.includes('First Mood Entry')) {
      newAchievements.push('First Mood Entry');
    }

    if (moodEntries.length >= 7 && !achievements.includes('Logged Mood for 7 Days')) {
      newAchievements.push('Logged Mood for 7 Days');
    }

    if (moodEntries.length >= 30 && !achievements.includes('Logged Mood for 30 Days')) {
      newAchievements.push('Logged Mood for 30 Days');
    }

    setAchievements((prevAchievements) => [...prevAchievements, ...newAchievements]);
  }, [moodEntries, achievements]);

  // Handle mood submission
  const handleMoodSubmit = () => {
    if (mood) {
      setMoodEntries([...moodEntries, { mood, date: new Date().toLocaleDateString() }]);
      setMood('');
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4">Mood Tracker</Typography>
        <TextField
          label="How are you feeling today?"
          variant="outlined"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={handleMoodSubmit}>
          Log Mood
        </Button>
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Recent Entries
        </Typography>
        <List>
          {moodEntries.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Mood: ${entry.mood}`} secondary={`Date: ${entry.date}`} />
            </ListItem>
          ))}
        </List>
        {insights && (
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            {insights}
          </Typography>
        )}
        <Box mt={5}>
          <Typography variant="h4">Achievements & Milestones</Typography>
          {achievements.length > 0 ? (
            <List>
              {achievements.map((achievement, index) => (
                <ListItem key={index}>
                  <ListItemText primary={achievement} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No achievements yet. Start logging your moods!</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MoodTracker;
