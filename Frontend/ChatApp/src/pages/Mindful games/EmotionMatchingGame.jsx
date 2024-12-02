import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';
import MindWellAppLayout from '../../components/Layout/MindWellApplayout';

const emotions = [
  { image: 'https://images.unsplash.com/photo-1628371637455-ce798906f974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFwcHl8ZW58MHx8MHx8fDA%3D', label: 'Happy' },
  { image: 'https://images.unsplash.com/photo-1617859822391-9c4bc92ff4f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNhZHxlbnwwfHwwfHx8MA%3D%3D', label: 'Sad' },
  { image: 'https://media.istockphoto.com/id/1387633760/photo/studio-portrait-photo-of-young-asian-woman-with-anger-face-expression-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=2YKD_IDH-60IXtPJrG5oXVggAPfwnrt_McmjUmrZd6U=', label: 'Angry' },
  { image: 'https://images.unsplash.com/photo-1644587590691-e630fe71f133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VwcmlzZWR8ZW58MHx8MHx8fDA%3D', label: 'Surprised' },
  { image: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV1dHJhbCUyMGZhY2V8ZW58MHx8MHx8fDA%3D', label: 'Neutral' },
];

const EmotionMatchingGame = () => {
  const [currentEmotion, setCurrentEmotion] = useState(emotions[0]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [progress, setProgress] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    const nextEmotion = emotions[Math.floor(Math.random() * emotions.length)];
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
    setCurrentEmotion(emotions[0]);
  };

  return (
    <MindWellAppLayout>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Emotion Matching Game
        </Typography>
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
          {emotions.map((emotion) => (
            <Grid item key={emotion.label}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAnswer(emotion.label)}
                style={{ width: '120px' }}
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
