import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
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

const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  question: { fontSize: 14, marginTop: 10, marginBottom: 5 },
  answer: { fontSize: 12, marginLeft: 10 }
});

const PDFDocument = ({ responses, questions }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Survey Responses</Text>
      {questions.map((question) => (
        <View key={question.id}>
          <Text style={pdfStyles.question}>{question.text}</Text>
          <Text style={pdfStyles.answer}>
            {question.options.find(option => option.value === responses[question.column])?.label || 'No answer'}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { responses, results, questions } = location.state || {};

  if (!questions || !responses || !results) {
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
                Sorry, there was an error loading your results. Please try taking the survey again.
              </Alert>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={() => navigate('/questions')}
                >
                  Take Survey Again
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      </ThemeProvider>
    );
  }

  const predictionText = results?.[0] === 1
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
                          {question.options.find(option => option.value === responses[question.column])?.label || 'No answer'}
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
                <Paper elevation={2} sx={{ p: 3, mt: 4, bgcolor: 'info.light' }}>
                  <Typography variant="h5" gutterBottom>
                    Screening Result
                  </Typography>
                  <Typography variant="body1">
                    {predictionText}
                  </Typography>
                </Paper>
              </motion.div>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                >
                  Go to Home Page
                </Button>
                <PDFDownloadLink
                  document={<PDFDocument responses={responses} questions={questions} />}
                  fileName="survey_responses.pdf"
                >
                  {({ blob, url, loading, error }) => (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<FileDownload />}
                      disabled={loading}
                    >
                      {loading ? 'Loading document...' : 'Download Results PDF'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Results;
