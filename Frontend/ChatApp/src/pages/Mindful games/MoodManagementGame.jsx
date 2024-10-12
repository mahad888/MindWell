import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import MoodSelector from './MoodSelector';
import MoodSuggestions from './MoodSuggestions';
import MoodHistory from './MoodHistory';
import { useSelector } from 'react-redux';

const MoodManagementGame = () => {
    const { user } = useSelector(state => state.auth);
    const [selectedMood, setSelectedMood] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const token = localStorage.getItem('auth');
    const userId = user._id;

    // Fetch user's mood history from backend
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/api/moods/history/${userId}`, { withCredentials: true , headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }} )
                .then(response => {
                    console.log('API response data:', response.data); // Debug log
                    if (Array.isArray(response.data)) {
                        setMoodHistory(response.data);
                    } else {
                        console.error('Unexpected data format:', response.data);
                    }
                })
                .catch(error => console.error('Error fetching mood history:', error));
        }
    }, [user]);

    const handleMoodChange = (mood) => {
        setSelectedMood(mood);

        // Save mood to backend
        axios.post('/api/moods', { userId: user._id, mood })
            .then(response => {
                setMoodHistory([...moodHistory, response.data]);
                fetchSuggestions(mood); // Fetch suggestions based on selected mood
            })
            .catch(error => console.error('Error saving mood:', error));
    };

    const fetchSuggestions = (mood) => {
        axios.get(`http://localhost:5000/api/suggestions?mood=${mood}`
        , { withCredentials: true , headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },}
        )
            .then(response => setSuggestions(response.data))
            .catch(error => console.error('Error fetching suggestions:', error));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Mood Management Game
            </Typography>
            {!user ? (
                'Please log in to play the mood management game.'
            ) : (
                <>
                    <MoodSelector onMoodChange={handleMoodChange} />
                    {selectedMood && <MoodSuggestions mood={selectedMood} suggestions={suggestions} />}
                    <MoodHistory history={moodHistory} />
                </>
            )}
        </Container>
    );
};

export default MoodManagementGame;
