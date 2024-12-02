import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from "axios";
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
import MindWellAppLayout from '../../components/Layout/MindWellApplayout';

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
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [jsonResponses, setJsonResponses] = useState(null);

  const validateResponses = () => {
    if (!questions || !Array.isArray(questions)) {
      setError("Invalid questions configuration");
      return false;
    }

    const missingResponses = questions.filter(
      q => !responses[q.column]
    );

    if (missingResponses.length > 0) {
      setError(`Please answer all questions. Missing: ${missingResponses.length} answers`);
      return false;
    }

    return true;
  };

  const handleResponseChange = (column, value) => {
    const updatedResponses = {
      ...responses,
      [column]: value.toString() // Ensure value is stored as string
    };
    
    setResponses(updatedResponses);
    
    const jsonData = questions.map(question => ({
      question: question.text,
      column: question.column,
      selectedAnswer: value.toString()
    }));
    
    setJsonResponses(jsonData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateResponses()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Sending responses:', responses); // Debug log

      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Received results:', data); // Debug log

      // In your handleSubmit function, modify the surveyResponses creation:
const surveyResponses = questions.map(q => {
  // First find the matching option by converting response to number for comparison
  const matchingOption = q.options.find(opt => 
    opt.value === Number(responses[q.column])
  );
  
  return {
    question: q.text,
    column: q.column,
    selectedAnswer: matchingOption ? matchingOption.label : '' // Store the label (string)
  };
});

      if (!data || !Array.isArray(data.predictions)) {
        throw new Error('Invalid response format from server');
      }

      // Create a structured result object
      const resultData = {
        responses,
        results: data.predictions,
        questions,
        timestamp: new Date().toISOString()
      };
      
      const token = localStorage.getItem("auth")
      const submitAssessment = async () => {
        try {
          // Assuming you have the necessary data in your component's state
          console.log('HERE ARE YOUR RESPONES: ',responses);
          console.log("HERE ARE YOUR QUESTIONS: ",questions);
          console.log("HERE IS YOUR SURVEY RESPONSES: ",surveyResponses);
          const response = await axios.post('http://localhost:5000/api/postAssessment', {
            surveyResponses,
            results:data.predictions[0]
          }, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });
          // Handle the successful response
          console.log(response?.data);
        } catch (error) {
          console.error('Error creating assessment:', error);
          throw error;
        }
      };

      submitAssessment();
      console.log('SHAHIK JAHAN Navigating with data:', resultData); // Debug log


      navigate('/results', { 
        state: resultData,
        replace: true // Prevent going back to form
      });

    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
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
    <MindWellAppLayout>
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
                        <FormControl component="fieldset" required>
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
                    disabled={isSubmitting}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 28,
                      background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  </Button>
                </Box>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="error" sx={{ mt: 3 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
    </MindWellAppLayout>

  );
};

export default Survey
