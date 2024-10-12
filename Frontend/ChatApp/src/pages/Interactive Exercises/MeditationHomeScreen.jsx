import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { People as UsersIcon, Air as WindIcon, MenuBook as BookOpenIcon, Menu as MenuIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f59e0b',
    },
    secondary: {
      main: '#f97316',
    },
    background: {
      default: '#fff7ed',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

const MindwellHomeScreen = () => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const options = [
    { title: 'Mindfulness Meditation', icon: UsersIcon, color: 'linear-gradient(to bottom right, #fecdd3, #fda4af)', description: 'Cultivate awareness and live in the present moment', path: '/mindfulness_meditation' },
    { title: 'Breathing Exercises', icon: WindIcon, color: 'linear-gradient(to bottom right, #bae6fd, #7dd3fc)', description: 'Master your breath to reduce stress and increase focus', path: '/breathing_exercises' },
    { title: 'Journaling Prompts', icon: BookOpenIcon, color: 'linear-gradient(to bottom right, #a7f3d0, #6ee7b7)', description: 'Reflect on your thoughts and emotions through guided writing', path: '/journaling_prompts' },
  ];

  const navItems = ['Home', 'Practices', 'About', 'Blog', 'Contact'];

  const handleOptionClick = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fef3c7, #fed7aa)' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main' }} />
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                  Mindwell
                </Typography>
              </Box>
              {!isMobile && (
                <Box sx={{ display: 'flex', bgcolor: 'white', borderRadius: 30, boxShadow: 1 }}>
                  {navItems.map((item, index) => (
                    <Button
                      key={index}
                      sx={{
                        px: 2,
                        py: 1,
                        color: 'primary.dark',
                        '&:hover': { bgcolor: 'primary.50' },
                        borderRadius: index === 0 ? '30px 0 0 30px' : index === navItems.length - 1 ? '0 30px 30px 0' : 0,
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
              )}
              {isMobile && (
                <IconButton edge="end" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Container>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 3, lineHeight: 1.2 }}>
              Nurture Your<br />Mind, Body, and Soul
            </Typography>
            <Typography variant="h5" sx={{ color: 'primary.dark', mb: 5, maxWidth: 'md', mx: 'auto' }}>
              Embark on a transformative journey of self-discovery and inner peace. Choose your path to tranquility and mindfulness.
            </Typography>
            <Box sx={{ width: 96, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {options.map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    background: option.color,
                    borderRadius: 4,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 8,
                    },
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={() => setHoveredOption(index)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={() => handleOptionClick(option.path)}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'white',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      '&:hover': { opacity: 0.2 },
                    }}
                  />
                  <option.icon sx={{ fontSize: 64, mb: 3, color: 'text.primary', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                  <Typography variant="h4" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 2, textAlign: 'center' }}>
                    {option.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      transition: 'opacity 0.3s',
                      opacity: hoveredOption === index ? 1 : 0,
                    }}
                  >
                    {option.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: 'white',
                      color: 'text.primary',
                      '&:hover': { bgcolor: 'grey.100' },
                      transition: 'all 0.3s',
                      opacity: hoveredOption === index ? 1 : 0,
                      transform: hoveredOption === index ? 'translateY(0)' : 'translateY(1rem)',
                    }}
                  >
                    Start now
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box component="footer" sx={{ mt: 10, textAlign: 'center', color: 'primary.dark', pb: 4 }}>
          <Typography>© 2024 Mindwell. All rights reserved.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MindwellHomeScreen;