import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";


const generateCards = () => {
  const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cards = [...cardValues, ...cardValues];
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [timer, setTimer] = useState(60); // Default timer duration
  const [timeLeft, setTimeLeft] = useState(timer);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (isGameRunning && timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      setIsGameRunning(false);
    }
  }, [timeLeft, isGameRunning]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first] === cards[second]) {
        setMatchedIndices([...matchedIndices, first, second]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices]);

  useEffect(() => {
    if (matchedIndices.length === cards.length && isGameRunning) {
      setIsWin(true);
      setIsGameRunning(false);
    }
  }, [matchedIndices, cards.length, isGameRunning]);

  const handleClick = (index) => {
    if (
      flippedIndices.length < 2 &&
      !flippedIndices.includes(index) &&
      !matchedIndices.includes(index)
    ) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  const handleStartGame = () => {
    setCards(generateCards());
    setMatchedIndices([]);
    setFlippedIndices([]);
    setTimeLeft(timer);
    setIsGameOver(false);
    setIsGameRunning(true);
    setIsWin(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Memory Game
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Memory Game! The goal is to match all the pairs of cards.
        Click on a card to flip it over and reveal its value. Try to remember
        the values and find the matching pairs. Once you match all the pairs,
        you win! Good luck!
      </Typography>

      {!isGameRunning && !isWin && (
        <div style={{ marginBottom: "20px" }}>
          <Typography variant="body1" gutterBottom>
            Set your timer (in seconds):
          </Typography>
          <TextField
            type="number"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            label="Timer"
            variant="outlined"
            size="small"
            style={{ marginRight: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={handleStartGame}>
            Start Game
          </Button>
        </div>
      )}

      {isGameRunning && (
        <Typography variant="h6" gutterBottom>
          Time Left: {timeLeft} seconds
        </Typography>
      )}

      {isGameOver && !isWin && (
        <Typography variant="h5" color="error" gutterBottom>
          Game Over! Time's up!
        </Typography>
      )}

      {isWin && (
        <>
        <Typography variant="h5" color="success" gutterBottom>
          Congratulations! You matched all the cards!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleStartGame}
        style={{marginTop:"10px",marginBottom:"10px"}}
        >
        Start Game
      </Button>
      </>

      )}

      <Grid container spacing={1}>
        {cards.map((card, index) => (
          <Grid item xs={3} key={index}>
            <Button
              variant="contained"
              style={{
                height: "100px",
                width: "100px",
                backgroundColor:
                  flippedIndices.includes(index) || matchedIndices.includes(index)
                    ? "#3E8EDE"
                    : "#ccc",
              }}
              onClick={() => handleClick(index)}
              disabled={isGameOver || !isGameRunning || isWin}
            >
              {flippedIndices.includes(index) || matchedIndices.includes(index)
                ? card
                : "?"}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MemoryGame;
