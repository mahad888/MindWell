import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Container,
  Paper,
  createTheme,
  ThemeProvider,
  FormControl,
  FormLabel
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Survey = ({ questions }) => {
  const [responses, setResponses] = useState({});
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleResponseChange = (column, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [column]: value,
    }));
    setShowError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questions || Object.keys(responses).length !== questions.length) {
      setShowError(true);
      return;
    }
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });
      const results = await res.json();
      navigate('/results', { state: { responses, results, questions } });
    } catch (error) {
      console.error('Error:', error);
      setShowError(true);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 6,
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Container maxWidth="md">
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              No questions available. Please check your configuration.
            </Alert>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 6,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h3" component="h1" align="center" gutterBottom>
                Mental Health Screening Survey
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            <Typography variant="h6" gutterBottom>
                              {question.text}
                            </Typography>
                          </FormLabel>
                          <RadioGroup
                            name={question.column}
                            value={responses[question.column] || ''}
                            onChange={(e) => handleResponseChange(question.column, e.target.value)}
                          >
                            {question.options.map((option) => (
                              <FormControlLabel
                                key={option.id}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                                sx={{
                                  '&:hover': {
                                    bgcolor: 'action.hover',
                                    borderRadius: 1,
                                  },
                                  py: 1,
                                  px: 2,
                                }}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </motion.div>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 28,
                      background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                    }}
                  >
                    Submit Survey
                  </Button>
                </Box>
              </form>

              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="error" sx={{ mt: 3 }}>
                    <AlertTitle>Error</AlertTitle>
                    {!questions || Object.keys(responses).length !== questions.length
                      ? "Please answer all questions before submitting."
                      : "An error occurred while submitting the survey. Please try again."}
                  </Alert>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Survey;
