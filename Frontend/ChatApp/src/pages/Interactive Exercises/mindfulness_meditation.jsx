import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, Headphones, Videocam, Air } from '@mui/icons-material';

const GradientBackground = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #e6f3ff, #e6fcff, #e6fffb)',
}));

const GradientCard = styled(Card)(({ theme, color }) => ({
  background: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`,
  color: 'white',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const MindfulnessMeditationPage = () => {
  const navigate = useNavigate();

  const breathingOptions = [
    { 
      title: 'Audio Guided Mindfulness meditation', 
      icon: Headphones, 
      color: ['#87CEEB', '#4169E1'], 
      description: 'Immerse yourself in calming audio guidance for controlled breathing',
      path: '/mindfulness_audio'
    },
    { 
      title: 'Video Guided Mindfulness Meditation', 
      icon: Videocam, 
      color: ['#9370DB', '#8A2BE2'], 
      description: 'Follow along with visual cues and serene landscapes for a complete breathing experience',
      path: '/mindfulness_video'
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <GradientBackground>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
            Mindfulness Meditation
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={10} position="relative">
          <Typography variant="h2" component="h1" gutterBottom color="primary.dark" fontWeight="bold">
            Breathe Your Way to Serenity
          </Typography>
          <Typography variant="h5" paragraph color="text.secondary" maxWidth="md" mx="auto">
            Choose your preferred Mindfulness Meditation Exercise and embark on a journey to reduce stress, increase focus, and find inner peace.
          </Typography>
          <Box width={100} height={4} bgcolor="primary.main" mx="auto" borderRadius={2} />
        </Box>

        <Box mb={12} position="relative" sx={{ perspective: 1000 }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #4169E1, #20B2AA)',
              borderRadius: 4,
              filter: 'blur(20px)',
              opacity: 0.5,
              transition: 'opacity 0.5s',
              '&:hover': {
                opacity: 0.75,
              },
            }}
          />
          <Box
            sx={{
              position: 'relative',
              transition: 'transform 0.7s',
              '&:hover': {
                transform: 'rotateY(12deg)',
              },
            }}
          >
            <CardMedia
              component="img"
              image="images/mindfulness.jpg"
              alt="Serene breathing exercise scene"
              sx={{ borderRadius: 4, boxShadow: 8 }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                borderRadius: 4,
                opacity: 0,
                transition: 'opacity 0.7s',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <Box position="absolute" bottom={0} left={0} right={0} p={4} color="white">
                <Typography variant="h4" gutterBottom>Discover Inner Calm</Typography>
                <Typography variant="body1">Experience the transformative power of mindfulness meditation</Typography>
              </Box>
            </Box>
          </Box>
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
              opacity: 0,
              transition: 'opacity 0.7s',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Air sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        <Grid container spacing={6}>
          {breathingOptions.map((option, index) => (
            <Grid item xs={12} md={6} key={index}>
              <GradientCard color={option.color} onClick={() => handleNavigation(option.path)}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                  <IconWrapper>
                    <option.icon sx={{ fontSize: 48, color: 'primary.main' }} />
                  </IconWrapper>
                  <Typography variant="h4" component="h3" gutterBottom align="center">
                    {option.title}
                  </Typography>
                  <Typography variant="body1" paragraph align="center">
                    {option.description}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Start Meditation
                  </Button>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box component="footer" mt={12} textAlign="center" pb={4}>
        <Typography variant="body2" color="text.secondary">
          © 2024 Mindwell. All rights reserved.
        </Typography>
      </Box>
    </GradientBackground>
  );
};

export default MindfulnessMeditationPage;