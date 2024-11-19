import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, Typography, CircularProgress, Grid, LinearProgress, Snackbar, Alert, Tooltip, IconButton,
  Avatar, Paper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MindWellAppLayout from '../../components/Layout/MindWellApplayout';
import { randomQuestions } from './questions';

// Sample questions with additional features
const questions = [...randomQuestions]

const EducationalGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(15);
  const [hintUsed, setHintUsed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [questions, setQuestions] = useState(randomQuestions);



  useEffect(() => {
    if (timer > 0 && !showFeedback) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleSubmitAnswer();
    }
  }, [timer, showFeedback]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    setLoading(true);
    setTimeout(() => {
      if (selectedOption === questions[currentQuestionIndex].answer) {
        setScore(score + (hintUsed ? 5 : 10));
      }
      setShowFeedback(true);
      setLoading(false);
    }, 500);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setHintUsed(false);
    setTimer(15);
    setSnackbarOpen(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Game Over! Your Score: ${score}/${questions.length * 10}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  const handleHint = () => {
    setHintUsed(true);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <MindWellAppLayout>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: '#f0f0f0', padding: 2 }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 800, width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary', width: 56, height: 56, marginBottom: 2 }}>
            <EmojiEventsIcon />
          </Avatar>
          <Typography variant="h4" component="div" gutterBottom>
            Mental Health Educational Game
          </Typography>

          <LinearProgress
            variant="determinate"
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            sx={{ width: '100%', mb: 2 }}
            color='primary'
          />

          <Box display="flex" alignItems="center" width="100%" mb={2}>
            <Typography variant="h6" component="div" flexGrow={1}>
              {questions[currentQuestionIndex]?.question}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Time left: {timer} seconds
            </Typography>
          </Box>

          <Grid container spacing={2} marginBottom={2}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  variant={selectedOption === index ? 'contained' : 'outlined'}
                  onClick={() => handleOptionSelect(index)}
                  fullWidth
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Tooltip title={hintUsed ? 'Hint used' : 'Use a hint (score reduction)'}>
              <IconButton onClick={handleHint} disabled={hintUsed}>
                <HelpOutlineIcon color={hintUsed ? 'disabled' : 'primary'} />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              onClick={showFeedback ? handleNextQuestion : handleSubmitAnswer}
              fullWidth
              color={showFeedback ? 'primary' : 'secondary'}
            >
              {showFeedback ? 'Next Question' : 'Submit Answer'}
            </Button>
          </Box>

          {loading && <CircularProgress sx={{ marginTop: 2 }} />}

          {showFeedback && (
            <Box mt={2}>
              <Typography
                variant="body1"
                color={selectedOption === questions[currentQuestionIndex].answer ? 'success.main' : 'error.main'}
                gutterBottom
              >
                {selectedOption === questions[currentQuestionIndex].answer ? 'Correct!' : 'Incorrect!'}{' '}
                {questions[currentQuestionIndex].explanation}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={hintUsed ? 'warning' : 'info'} sx={{ width: '100%' }}>
          {hintUsed ? questions[currentQuestionIndex].hint : 'Hint used! Score will be reduced.'}
        </Alert>
      </Snackbar>
    </Box>
    </MindWellAppLayout>
  );
};

export default EducationalGame;
