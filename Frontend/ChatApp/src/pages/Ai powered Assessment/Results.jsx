import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FileDownload, Refresh, Home } from '@mui/icons-material';
import { 
  Alert, 
  AlertTitle, 
  Button, 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Grid,
  createTheme,
  ThemeProvider
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

// Create styles for PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#3f51b5',
    paddingBottom: 10,
    alignItems: 'center'
  },
  headerLogo: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  headerText: {
    flex: 1
  },
  title: {
    fontSize: 24,
    color: '#3f51b5',
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#666666'
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginBottom: 15
  },
  questionSection: {
    marginBottom: 20,
    borderLeft: 1,
    borderLeftColor: '#3f51b5',
    paddingLeft: 10
  },
  question: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  answer: {
    fontSize: 12,
    color: '#34495e',
    marginLeft: 10
  },
  resultSection: {
    margin: 10,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    marginTop: 20
  },
  resultTitle: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 10
  },
  resultText: {
    fontSize: 12,
    color: '#2196f3'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10
  },
  timestamp: {
    fontSize: 10,
    color: '#9e9e9e',
    textAlign: 'center'
  },
  watermark: {
    position: 'absolute',
    top: 300,
    left: 200,
    opacity: 0.1,
    transform: 'rotate(-45deg)'
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#9e9e9e'
  }
});

// Brain Logo component for PDF
const BrainLogo = () => (
  <Svg width={50} height={50} viewBox="0 0 100 100">
    <Path
      d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
      fill="#3f51b5"
    />
    <Path
      d="M65 35c-5.5 0-10 4.5-10 10 0 1.2.2 2.4.6 3.4-1.9 1.1-3.4 2.9-4.1 5.1-.7-2.2-2.2-4-4.1-5.1.4-1 .6-2.2.6-3.4 0-5.5-4.5-10-10-10s-10 4.5-10 10c0 4.7 3.2 8.6 7.5 9.7-.5 1.7-.5 3.6 0 5.3-4.3 1.1-7.5 5-7.5 9.7 0 5.5 4.5 10 10 10s10-4.5 10-10c0-1.2-.2-2.4-.6-3.4 1.9-1.1 3.4-2.9 4.1-5.1.7 2.2 2.2 4 4.1 5.1-.4 1-.6 2.2-.6 3.4 0 5.5 4.5 10 10 10s10-4.5 10-10c0-4.7-3.2-8.6-7.5-9.7.5-1.7.5-3.6 0-5.3 4.3-1.1 7.5-5 7.5-9.7 0-5.5-4.5-10-10-10z"
      fill="#3f51b5"
    />
  </Svg>
);

// Enhanced PDF Document Component
const PDFDocument = ({ responses, questions, timestamp, results }) => {
  const predictionText = results[0] === 1
    ? "Based on your responses, you may be experiencing symptoms of depression."
    : "Based on your responses, you are not likely to be experiencing significant symptoms of depression.";

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Watermark */}
        <View style={pdfStyles.watermark}>
          <BrainLogo />
        </View>

        {/* Header */}
        <View style={pdfStyles.header}>
          <View style={pdfStyles.headerLogo}>
            <BrainLogo />
          </View>
          <View style={pdfStyles.headerText}>
            <Text style={pdfStyles.title}>Mental Health Assessment</Text>
            <Text style={pdfStyles.subtitle}>Confidential Survey Results</Text>
          </View>
        </View>

        {/* Results Summary */}
        <View style={pdfStyles.resultSection}>
          <Text style={pdfStyles.resultTitle}>Assessment Summary</Text>
          <Text style={pdfStyles.resultText}>{predictionText}</Text>
          {results[0] === 1 && (
            <Text style={[pdfStyles.resultText, { marginTop: 10, fontSize: 11 }]}>
              Please consider consulting with a mental health professional for a proper evaluation.
            </Text>
          )}
        </View>

        {/* Questions and Answers */}
        <View style={pdfStyles.section}>
          <Text style={[pdfStyles.resultTitle, { marginBottom: 15 }]}>Detailed Responses</Text>
          {questions.map((question) => (
            <View key={question.id} style={pdfStyles.questionSection}>
              <Text style={pdfStyles.question}>{question.text}</Text>
              <Text style={pdfStyles.answer}>
                {question.options.find(option => 
                  String(option.value) === String(responses[question.column])
                )?.label || 'No answer'}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <Text style={pdfStyles.timestamp}>
            Generated on: {new Date(timestamp).toLocaleString()}
          </Text>
          <Text style={[pdfStyles.timestamp, { marginTop: 5 }]}>
            This assessment is for screening purposes only and should not be considered as a clinical diagnosis.
          </Text>
        </View>

        {/* Page Number */}
        <Text style={pdfStyles.pageNumber}>Page 1</Text>
      </Page>
    </Document>
  );
};

// Main Results Component
const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [validData, setValidData] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const validateData = () => {
      try {
        const { responses, results, questions, timestamp } = location.state || {};

        if (!location.state) {
          throw new Error('No data received. Please take the survey first.');
        }

        if (!responses || typeof responses !== 'object') {
          throw new Error('Invalid response data');
        }

        if (!results || !Array.isArray(results)) {
          throw new Error('Invalid results data');
        }

        if (!questions || !Array.isArray(questions)) {
          throw new Error('Invalid questions data');
        }

        const missingResponses = questions.filter(question => 
          responses[question.column] === undefined || responses[question.column] === null
        );

        if (missingResponses.length > 0) {
          throw new Error(`Missing responses for some questions`);
        }

        const normalizedResponses = Object.keys(responses).reduce((acc, key) => ({
          ...acc,
          [key]: String(responses[key])
        }), {});

        setSurveyData({ 
          responses: normalizedResponses,
          results, 
          questions, 
          timestamp 
        });
        setValidData(true);
      } catch (err) {
        console.error('Validation error:', err);
        setError(err.message);
        setValidData(false);
      }


      
      
    };
    
    validateData();
    // var result=results[0];
    // //call an api to store data

    // const submitAssessment=async ()=>{
    //   try{
    //     const response=await axios.post('http://localhost:5000/api/postAssessment',{
    //       userId,
    //       result

    //     });
    //     console.log('Assessment created:', response.data);
    //   }
    //   catch(e){
    //     console.error('Error creating assessment:', e);
    //   }
    // }


  }, [location.state]);

  const findAnswer = (question, responses) => {
    const answer = question.options.find(option => 
      String(option.value) === String(responses[question.column])
    );
    return answer?.label || 'No answer';
  };

  if (error || !validData || !surveyData) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'error.light',
            p: 4
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                <AlertTitle>Error</AlertTitle>
                {error || 'There was an error loading your results.'}
              </Alert>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={() => navigate('/questions')}
                >
                  Take Survey Again
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                >
                  Go Home
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      </ThemeProvider>
    );
  }

  const { responses, results, questions, timestamp } = surveyData;
  const predictionText = results[0] === 1
    ? "Based on your responses, you may be experiencing symptoms of depression."
    : "Based on your responses, you are not likely to be experiencing significant symptoms of depression.";

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
                Your Mental Health Results
              </Typography>
              <Grid container spacing={3}>
                {questions.map((question, index) => (
                  <Grid item xs={12} key={question.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
                        <Typography variant="h6" gutterBottom>
                          {question.text}
                        </Typography>
                        <Typography variant="body1">
                          {findAnswer(question, responses)}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: questions.length * 0.1 }}
              >
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    mt: 4, 
                    bgcolor: results[0] === 1 ? 'warning.light' : 'success.light',
                    color: 'text.primary'
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Screening Result
                  </Typography>
                  <Typography variant="body1">
                    {predictionText}
                  </Typography>
                  {results[0] === 1 && (
                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                      Please consider consulting with a mental health professional for a proper evaluation.
                    </Typography>
                  )}
                </Paper>
              </motion.div>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FileDownload />}
                >
                  <PDFDownloadLink
                    document={
                      <PDFDocument 
                        responses={responses} 
                        questions={questions} 
                        timestamp={timestamp}
                        results={results}
                      />
                    }
                    fileName="mental_health_assessment.pdf"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {({ loading }) => (loading ? 'Loading PDF...' : 'Download PDF')}
                  </PDFDownloadLink>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => navigate('/questions')}
                >
                  Take Survey Again
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={() => {
                  navigate('/')
                  console.log("SHAHYK JAHAN YOUR REQUEST BODY IS :"+ req.userId);
                  }
                  }
                >
                  Go Home
                </Button>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Note: This assessment is for screening purposes only and should not be considered as a clinical diagnosis.
                  If you're experiencing distress, please reach out to a mental health professional.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  In case of emergency, contact your local emergency services or mental health crisis hotline.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Results;