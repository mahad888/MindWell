import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MemoryIcon from '@mui/icons-material/Memory';
import MoodIcon from '@mui/icons-material/Mood';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import MindWellAppLayout from '../../components/Layout/MindWellApplayout';

const GameCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
  },
}));

const GameSelection = () => {
  const navigate = useNavigate();

  const gameOptions = [
    {
      title: 'Educational Games',
      icon: <SportsEsportsIcon fontSize="large" sx={{ color: '#2196F3' }} />,
      description: 'Boost your knowledge with fun and interactive learning games.',
      route: '/educational-game',
    },
    {
      title: 'Memory Games',
      icon: <MemoryIcon fontSize="large" sx={{ color: '#4CAF50' }} />,
      description: 'Sharpen your mind and improve memory skills with engaging challenges.',
      route: '/memory-game',
    },
    {
      title: 'Mood Management Games',
      icon: <MoodIcon fontSize="large" sx={{ color: '#FFB300' }} />,
      description: 'Manage your mood and feel more balanced with relaxing games.',
      route: 'mood-management',
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <MindWellAppLayout>
    <Box sx={{ py: 5, px: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        Select Your Game
      </Typography>
      <Grid container spacing={4} justifyContent="center"  >
        {gameOptions.map((game, index) => (
          <Grid item key={index}>
            <GameCard onClick={() => handleCardClick(game.route)} sx={{
              height:"17rem",
        maxHeight:"20rem"
      }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'transparent', width: 56, height: 56, margin: 'auto' }}>
                  {game.icon}
                </Avatar>
                <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 'medium', color: '#444' }}>
                  {game.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  {game.description}
                </Typography>
              </CardContent>
            </GameCard>
          </Grid>
        ))}
      </Grid>
    </Box>
    </MindWellAppLayout>
  );
};

export default GameSelection;
