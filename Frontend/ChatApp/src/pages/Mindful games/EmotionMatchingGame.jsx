import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
  IconButton,
  Box
} from '@mui/material';
import { Alert } from '@mui/material';
import MindWellAppLayout from '../../components/Layout/MindWellApplayout';
import emotionData from './emotions';


import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmotionMatchingGame = () => {
  const [currentEmotion, setCurrentEmotion] = useState(emotionData[0]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [progress, setProgress] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook


  const displayedEmotions = emotionData.slice(0, 5); // Only show the first 5 emotions

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      setGameOver(true);
      setMessage('Time is up!');
    }
  }, [timer, gameOver]);

  const handleAnswer = (choice) => {
    if (gameOver) return;

    if (choice === currentEmotion.label) {
      setScore(score + 1);
      setProgress(progress + 20); // Increment progress
      setMessage('Correct!');
    } else {
      setMessage('Try Again!');
    }

    setSnackbarOpen(true);

    // Stop the game if score or progress reaches 100
    if (progress + 20 >= 100) {
      setGameOver(true);
      setMessage('Congratulations! You completed the game!');
      return;
    }

    // Load next emotion
    const nextEmotion = emotionData[Math.floor(Math.random() * emotionData.length)];
    setCurrentEmotion(nextEmotion);

    // Adjust timer based on difficulty
    const additionalTime = difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 3 : 1;
    setTimer((prev) => Math.min(prev + additionalTime, 10)); // Cap timer at 10 seconds
  };

  const handleRestart = () => {
    setScore(0);
    setTimer(10);
    setProgress(0);
    setGameOver(false);
    setMessage('');
    setCurrentEmotion(emotionData[0]);
  };

  return (
    <MindWellAppLayout>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Emotion Matching Game
        </Typography>
        <Box width="100%" display="flex" justifyContent="flex-start" mb={2}>
              <IconButton onClick={() => navigate(-1)} color="primary">
                <ArrowBackIcon />
              </IconButton>
            </Box>

        <Typography variant="h6" gutterBottom>
          Difficulty: {difficulty}
        </Typography>
        <Card style={{ width: '200px', margin: '20px auto', padding: '10px' }}>
          <CardMedia
            component="img"
            height="150"
            image={currentEmotion.image}
            alt={currentEmotion.label}
          />
        </Card>
        <Grid container spacing={2} justifyContent="center">
          {displayedEmotions.map((emotion) => (
            <Grid item key={emotion.label}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAnswer(emotion.label)}
                style={{ width: '150px' }}
                disabled={gameOver}
              >
                {emotion.label}
              </Button>
            </Grid>
          ))}
        </Grid>
        <div style={{ margin: '20px 0' }}>
          <Typography variant="h6">Score: {score}</Typography>
          <CircularProgress
            variant="determinate"
            value={progress}
            style={{ marginTop: '10px', color: progress === 100 ? 'green' : 'blue' }}
          />
          <Typography>{progress}% Completed</Typography>
          <Typography variant="h6" color={timer <= 3 ? 'error' : 'textPrimary'}>
            Time Remaining: {timer}s
          </Typography>
        </div>
        {gameOver && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h5" color="success">
              {message}
            </Typography>
            <Button
              onClick={handleRestart}
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Restart
            </Button>
          </div>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            severity={message === 'Correct!' ? 'success' : 'error'}
            onClose={() => setSnackbarOpen(false)}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </MindWellAppLayout>
  );
};

export default EmotionMatchingGame;
