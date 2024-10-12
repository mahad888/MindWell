import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea } from '@mui/material';

const InfoCards = ({ cardData }) => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
              },
            }}
          >
            <CardActionArea sx={{ height: '100%', padding: '1rem' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#333',
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    lineHeight: 1.6,
                    color: '#555',
                  }}
                >
                  {card.content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCards;
