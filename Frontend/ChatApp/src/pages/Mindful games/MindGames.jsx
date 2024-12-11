// src/components/Games.js
import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Container,IconButton } from '@mui/material';
import MemoryGame from './MemoryGames';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StressBall from './StressBall';
import MindWellAppLayout from '../../components/Layout/MindWellApplayout';
import { useNavigate } from 'react-router-dom';

const MindGames = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <MindWellAppLayout>
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Stress Management Mini-Games
      </Typography>
      <Box width="100%" display="flex" justifyContent="flex-start" mb={2}>
              <IconButton onClick={() => navigate(-1)} color="primary">
                <ArrowBackIcon />
              </IconButton>
            </Box>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="game tabs"
          centered
        >
          <Tab label="Memory Game" />
          <Tab label="Stress Ball" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {activeTab === 0 && <MemoryGame />}
        {activeTab === 1 && <StressBall />}
      </Box>
    </Container>
    </MindWellAppLayout>
  );
};

export default MindGames ;
