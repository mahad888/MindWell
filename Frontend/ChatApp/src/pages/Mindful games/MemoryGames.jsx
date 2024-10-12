// src/components/MemoryGame.js
import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';

const generateCards = () => {
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = [...cardValues, ...cardValues];
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first] === cards[second]) {
        setMatchedIndices([...matchedIndices, first, second]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices]);

  const handleClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  return (
    <div>
      <Typography variant="h4">Memory Game</Typography>
      <Grid container spacing={1}>
        {cards.map((card, index) => (
          <Grid item xs={3} key={index}>
            <Button
              variant="contained"
              style={{ height: '100px', width: '100px', backgroundColor: flippedIndices.includes(index) || matchedIndices.includes(index) ? '#fff' : '#ccc' }}
              onClick={() => handleClick(index)}
            >
              {flippedIndices.includes(index) || matchedIndices.includes(index) ? card : "?"}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MemoryGame;
