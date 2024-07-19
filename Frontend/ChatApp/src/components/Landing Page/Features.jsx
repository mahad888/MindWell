import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';

const items = [
  {
    icon: <PersonAddRoundedIcon />,
    title: 'User Management',
    description:
      'Secure registration, login, profile management, and account recovery for patients and doctors.',
    imageLight: 'url("/static/images/mindwell/user-management-light.png")',
    imageDark: 'url("/static/images/mindwell/user-management-dark.png")',
  },
  {
    icon: <AssessmentRoundedIcon />,
    title: 'AI-Powered Assessment',
    description:
      'Initial mental health assessment questionnaire and comprehensive evaluation of user responses.',
    imageLight: 'url("/static/images/mindwell/assessment-light.png")',
    imageDark: 'url("/static/images/mindwell/assessment-dark.png")',
  },
  {
    icon: <SentimentSatisfiedAltRoundedIcon />,
    title: 'Emotion Recognition',
    description:
      'Advanced AI algorithms analyze facial expressions in real-time to recognize a range of emotions.',
    imageLight: 'url("/static/images/mindwell/emotion-recognition-light.png")',
    imageDark: 'url("/static/images/mindwell/emotion-recognition-dark.png")',
  },
  {
    icon: <FitnessCenterRoundedIcon />,
    title: 'Interactive Exercises',
    description:
      'Mindfulness meditation, deep breathing exercises, and journaling with tracking and rewards.',
    imageLight: 'url("/static/images/mindwell/exercises-light.png")',
    imageDark: 'url("/static/images/mindwell/exercises-dark.png")',
  },
  {
    icon: <GroupRoundedIcon />,
    title: 'Peer Support and Community',
    description:
      'Facilitates peer support interactions, chat, community wall posts, and notifications.',
    imageLight: 'url("/static/images/mindwell/community-light.png")',
    imageDark: 'url("/static/images/mindwell/community-dark.png")',
  },
  {
    icon: <LocalHospitalRoundedIcon />,
    title: 'Remote Counseling',
    description:
      'Scheduling appointments, secure communication, and online payments for remote counseling.',
    imageLight: 'url("/static/images/mindwell/counseling-light.png")',
    imageDark: 'url("/static/images/mindwell/counseling-dark.png")',
  },
  {
    icon: <ShowChartRoundedIcon />,
    title: 'Progress Tracking and Analysis',
    description:
      'Visual representation of progress, goal tracking, graphs, notifications, and reminders.',
    imageLight: 'url("/static/images/mindwell/progress-tracking-light.png")',
    imageDark: 'url("/static/images/mindwell/progress-tracking-dark.png")',
  },
  {
    icon: <SmartToyRoundedIcon />,
    title: 'Smart Chatbot',
    description:
      'Chatbot answers questions about mental health, therapy techniques, and self-help strategies.',
    imageLight: 'url("/static/images/mindwell/chatbot-light.png")',
    imageDark: 'url("/static/images/mindwell/chatbot-dark.png")',
  },
  {
    icon: <SportsEsportsRoundedIcon />,
    title: 'Mindful Games and Activities',
    description:
      'Games for mood management, mindfulness, relaxation, social connection, and education.',
    imageLight: 'url("/static/images/mindwell/games-light.png")',
    imageDark: 'url("/static/images/mindwell/games-dark.png")',
  },
  {
    icon: <FeedbackRoundedIcon />,
    title: 'Feedback and Ratings',
    description:
      'User feedback forms, ratings, and comments on their experience and counseling sessions.',
    imageLight: 'url("/static/images/mindwell/feedback-light.png")',
    imageDark: 'url("/static/images/mindwell/feedback-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              MindWell Features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Discover the comprehensive features of MindWell that support mental health and well-being. Each feature is designed to provide an integrated and personalized experience for our users.
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : '';
                    }
                    return selectedItemIndex === index ? 'primary.light' : '';
                  },
                  background: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'none' : '';
                    }
                    return selectedItemIndex === index ? 'none' : '';
                  },
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200';
                    }
                    return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300';
                        }
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
