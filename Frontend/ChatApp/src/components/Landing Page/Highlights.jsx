import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const highlights = [
  {
    icon: <EmojiPeopleRoundedIcon />,
    title: 'Personalized Assessments',
    description:
      'Receive tailored mental health assessments to better understand your well-being.',
  },
  {
    icon: <SelfImprovementRoundedIcon />,
    title: 'Mindfulness Exercises',
    description:
      'Engage in guided mindfulness exercises designed to help you relax and focus.',
  },
  {
    icon: <FavoriteRoundedIcon />,
    title: 'Community Support',
    description:
      'Join a supportive community where you can share experiences and find encouragement.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovative Functionality',
    description:
      'Benefit from cutting-edge features that address your evolving mental health needs.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable Support',
    description:
      'Count on our responsive customer support, offering assistance beyond the app.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Detailed Progress Tracking',
    description:
      'Track your mental health journey with detailed and insightful progress reports.',
  },
];

const reviews = [
  {
    name: 'Muhammad Haris',
    review:
      'MindWell has transformed my approach to mental health. The personalized assessments are spot on!',
  },
  {
    name: 'Arslan Amin',
    review:
      'The mindfulness exercises are fantastic. They help me relax and stay focused throughout the day.',
  },
  {
    name: 'Areeba Arooj',
    review:
      'The community support is incredible. It’s great to connect with others who understand what I’m going through.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover the key features of MindWell: personalized assessments, mindfulness exercises, community support, innovative functionality, reliable customer support, and detailed progress tracking.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{highlight.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {highlight.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {highlight.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function Reviews() {
  return (
    <Box
      id="reviews"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#1a1a1a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            User Reviews
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            See what our users are saying about MindWell. Their feedback highlights the positive impact our app has on their mental well-being.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Typography fontWeight="medium" gutterBottom>
                  {review.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  {review.review}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
