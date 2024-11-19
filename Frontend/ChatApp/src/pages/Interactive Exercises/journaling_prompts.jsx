import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, Send, AutoAwesome, Lock, Check, Home } from '@mui/icons-material';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  TextField, 
  Box, 
  Paper, 
  IconButton,
  Grid,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00897b 30%, #4caf50 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00897b 30%, #4caf50 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(0, 137, 123, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
}));

const JournalingPromptsPage = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [journalEntries, setJournalEntries] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { mindVideo, mindAudio, breathingVideo, breathingAudio } = useSelector(state => state.data);

  const prompts = [
    { id: 1, text: "How did your meditation practice make you feel today?" },
    { id: 2, text: "What thoughts or emotions arose during your session?" },
    { id: 3, text: "Describe a moment of clarity or insight you experienced." },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < prompts.length) {
      if (selectedPrompt && journalEntries[selectedPrompt.id]?.trim()) {
        setCurrentStep(currentStep + 1);
        setSelectedPrompt(null);
      }
    } else {
      setIsSubmitted(true);
      sendData();
    }
  };

  const transformEntries = () => {
    return prompts.reduce((acc, prompt) => {
      acc[prompt.text] = journalEntries[prompt.id] || '';
      return acc;
    }, {});
  };
  const token = localStorage.getItem("auth")
  const sendData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const transformedPrompts = transformEntries();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/storeData',
        {
          prompts: transformedPrompts,
          // mindfulVideo: mindVideo || { type: '', allEmotions: [] },
          // mindfulAudio: mindAudio || { type: '', allEmotions: [] },
          // breathVideo: breathingVideo || { type: '', allEmotions: [] },
          // breathAudio: breathingAudio || { type: '', allEmotions: [] }
        },
        {
          withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
        }
      );
      console.log('DATA HAS BEEN SENT SUCCESSFULLY!', response);
    } catch (err) {
      setErrorMessage('Failed to send data, please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelection = (prompt) => {
    if (prompt.id <= currentStep) {
      setSelectedPrompt(prompt);
    }
  };

  const isPromptCompleted = (promptId) => {
    return journalEntries[promptId]?.trim().length > 0;
  };

  const allPromptsAnswered = Object.keys(journalEntries).length === prompts.length && 
    Object.values(journalEntries).every(entry => entry.trim().length > 0);

  const handleHomeRedirect = () => {
    window.location.href = '/';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#e0f2f1' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack />
          </IconButton>
          <GradientTypography variant="h4" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Mindful Journey
          </GradientTypography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Box textAlign="center" mb={8}>
                <Typography variant="h2" component="h2" color="primary" gutterBottom>
                  Nurture Your Inner Growth
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                  Embark on a journey of self-discovery. Answer each prompt in sequence to unlock deeper insights.
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {prompts.map((prompt, index) => (
                    <Grid item xs={12} key={prompt.id}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 4,
                          cursor: prompt.id <= currentStep ? 'pointer' : 'not-allowed',
                          opacity: prompt.id > currentStep ? 0.5 : 1,
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: prompt.id <= currentStep ? 'scale(1.02)' : 'none',
                            boxShadow: prompt.id <= currentStep ? 6 : 3,
                          },
                        }}
                        onClick={() => handlePromptSelection(prompt)}
                      >
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              bgcolor: isPromptCompleted(prompt.id) 
                                ? 'success.main'
                                : prompt.id <= currentStep 
                                  ? 'primary.main'
                                  : 'grey.400',
                              mr: 2,
                            }}
                          >
                            {isPromptCompleted(prompt.id) ? <Check /> : prompt.id > currentStep ? <Lock /> : index + 1}
                          </Box>
                          <Typography variant="h6" color={prompt.id <= currentStep ? 'textPrimary' : 'textSecondary'}>
                            {prompt.text}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <AnimatePresence mode="wait">
                  {selectedPrompt && (
                    <motion.div
                      key={selectedPrompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h5" gutterBottom>{selectedPrompt.text}</Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={8}
                          variant="outlined"
                          value={journalEntries[selectedPrompt.id] || ''}
                          onChange={(e) => setJournalEntries({...journalEntries, [selectedPrompt.id]: e.target.value})}
                          placeholder="Reflect on your experience..."
                          sx={{ mt: 2 }}
                        />
                      </Paper>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Box display="flex" justifyContent="flex-end" mt={4}>
                  <GradientButton
                    type="submit"
                    disabled={!selectedPrompt && !allPromptsAnswered || isLoading}
                    startIcon={<Send />}
                  >
                    {allPromptsAnswered ? 'Submit All Reflections' : 'Save Reflection'}
                  </GradientButton>
                </Box>
              </form>

              {errorMessage && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="submission"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', paddingTop: '5rem', paddingBottom: '5rem' }}
            >
              <AutoAwesome sx={{ fontSize: 60, color: 'success.main', mb: 3 }} />
              <Typography variant="h3" gutterBottom>
                Thank you for your reflections!
              </Typography>
              <Typography variant="h6" paragraph>
                Your journey of mindfulness has been recorded successfully. Take a deep breath and embrace the moment.
              </Typography>
              <GradientButton
                onClick={handleHomeRedirect}
                startIcon={<Home />}
                sx={{ mt: 4 }}
              >
                Return to Home
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default JournalingPromptsPage;