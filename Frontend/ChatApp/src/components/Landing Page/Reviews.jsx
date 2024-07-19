import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Areeba Arooj',
    occupation: 'Software Engineer',
    testimonial:
      "MindWell has transformed my mental health journey. The personalized assessments and mindfulness exercises are incredibly effective and easy to integrate into my daily routine.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Sana Khan',
    occupation: 'Product Designer',
    testimonial:
      "The support community on MindWell is fantastic. It's comforting to share experiences and get support from others who understand. The customer service is also top-notch.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Muhammad Haris ',
    occupation: 'Cyper Security Expert',
    testimonial:
      'MindWell’s user-friendly interface and detailed progress tracking have significantly simplified managing my mental health. Highly recommend this app to anyone looking to improve their mental well-being.',
  },
  {
    avatar: <Avatar alt="Julia Stewart" src="/static/images/avatar/4.jpg" />,
    name: 'Muhammad Mahad',
    occupation: 'Senior Engineer',
    testimonial:
      "I appreciate the attention to detail in MindWell’s design. The small touches, like the emotion recognition feature, make a big difference in providing a premium experience.",
  },
  {
    avatar: <Avatar alt="John Smith" src="/static/images/avatar/5.jpg" />,
    name: 'Abdur Rehman',
    occupation: 'Product Designer',
    testimonial:
      "MindWell stands out with its innovative features. The AI-powered assessments are incredibly accurate and helpful in understanding my mental health better.",
  },
  {
    avatar: <Avatar alt="Daniel Wolf" src="/static/images/avatar/6.jpg" />,
    name: 'Daoud Hussain',
    occupation: 'Chief Development Officer',
    testimonial:
      "The quality of MindWell exceeded my expectations. It's well-designed, built to last, and definitely worth the investment for anyone serious about their mental health.",
  },
];

// const whiteLogos = [
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
// ];

// const darkLogos = [
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
//   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
// ];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Reviews() {
  const theme = useTheme();
  // const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Container
      id="reviews"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component="h2" variant="h4" color="text.primary">
          Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our users love about the MindWell app. Discover how we excel in providing personalized mental health assessments, mindfulness exercises, community support, and more.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                {/* <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                /> */}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
