import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as faceapi from 'face-api.js';
import { 
  ThemeProvider, createTheme, 
  CssBaseline, AppBar, Toolbar, Typography, 
  IconButton, Box, Container, Grid, Paper, 
  Button, Card, CardContent, CardMedia, 
  List, ListItem, ListItemText, Collapse,
  Slider
} from '@mui/material';
import { 
  Notifications, AccountCircle, WbSunny, NightsStay,
  ExpandMore, ExpandLess, PlayArrow, Pause
} from '@mui/icons-material';
import { storeMindVideo } from '../../Redux/reducers/action';

const VideoPlayer = ({ videoSrc, darkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (event, newValue) => {
    videoRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: darkMode ? 'grey.800' : 'grey.200' }}>
      <video 
        ref={videoRef}
        src={videoSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 2 }}>
        <IconButton onClick={togglePlayPause} color={darkMode ? 'primary' : 'default'}>
          {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </IconButton>
      </Box>
      <Slider
        value={currentTime}
        max={duration}
        onChange={handleSeek}
        aria-labelledby="continuous-slider"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption" color={darkMode ? 'text.secondary' : 'text.primary'}>
          {formatTime(currentTime)}
        </Typography>
        <Typography variant="caption" color={darkMode ? 'text.secondary' : 'text.primary'}>
          {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );
};

const BreathingVideo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [expandedStyle, setExpandedStyle] = useState(null);
  const [emotions, setEmotions] = useState([]);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const videoRef = useRef();
  const canvasRef = useRef();
  const detectionRef = useRef(null);
  const emotionCounterRef = useRef({});
  const lastSaveTimeRef = useRef(Date.now());
  const dispatch = useDispatch();

  const emotionEmojis = {
    neutral: '😐', happy: '😊', sad: '😢', angry: '😠',
    fearful: '😨', disgusted: '🤢', surprised: '😲',
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        console.log('Models loaded successfully');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    loadModels();

    return () => {
      stopDetection();
    };
  }, []);

  useEffect(() => {
    if (isCameraReady) {
      startDetection();
    } else {
      stopDetection();
    }
  }, [isCameraReady]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleExpand = (style) => {
    setExpandedStyle(expandedStyle === style ? null : style);
  };

  const yogaStyles = [
    { name: 'Guided Meditation', videoSrc: '/videos/meditation-2.mp4' },
    { name: 'Meditation', videoSrc: '/videos/meditation-1.mp4' },
  ];

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsCameraReady(true);
        };
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Failed to access the camera. Please ensure you have given permission.");
    }
  };

  const toggleCameraVisibility = () => {
    if (!isCameraVisible) {
      setIsCameraVisible(true);
      initializeCamera();
    } else {
      stopDetection();
      setIsCameraVisible(false);
      setIsCameraReady(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  };

  const detectEmotions = async () => {
    if (!videoRef.current || !isCameraReady) return;

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const canvas = canvasRef.current;
      const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (detections.length > 0) {
        const dominantEmotion = Object.entries(detections[0].expressions).reduce(
          (max, [emotion, probability]) => (probability > max[1] ? [emotion, probability] : max),
          ['neutral', 0]
        )[0];

        setCurrentEmotion(dominantEmotion);
        emotionCounterRef.current[dominantEmotion] = (emotionCounterRef.current[dominantEmotion] || 0) + 1;

        const currentTime = Date.now();
        if (currentTime - lastSaveTimeRef.current >= 60000) { // 60000 ms = 1 minute
          const mostFrequentEmotion = Object.entries(emotionCounterRef.current).reduce(
            (max, [emotion, count]) => (count > max[1] ? [emotion, count] : max),
            ['neutral', 0]
          )[0];

          setEmotionHistory(prev => [...prev, mostFrequentEmotion]);
          emotionCounterRef.current = {}; // Reset the counter
          lastSaveTimeRef.current = currentTime;
        }
      } else {
        setCurrentEmotion('no face');
      }
    } catch (error) {
      console.error('Error during emotion detection:', error);
    }

    detectionRef.current = requestAnimationFrame(detectEmotions);
  };

  const startDetection = () => {
    if (!isCameraReady) {
      console.log("Camera is not ready. Waiting for it to initialize.");
      return;
    }
    setEmotions([]);
    emotionCounterRef.current = {};
    lastSaveTimeRef.current = Date.now();
    setEmotionHistory([]);
    detectEmotions();
  };

  const stopDetection = async() => {
    const mindVideo = {
      type: 'Breathing video',
      allEmotions: emotionHistory,
    };
dispatch(storeMindVideo (mindVideo));

    if (detectionRef.current) {
      cancelAnimationFrame(detectionRef.current);
      detectionRef.current = null;
    }

    if (emotionHistory.length > 0) {
      //SAVEEMOTIONHISTORY IS AN API
      await saveEmotionHistory(breathAudio);
    }

    console.log('Emotion history:', emotionHistory);
  };

  const getEmoji = (emotion) => emotionEmojis[emotion] || '❓';

  //CALLING AN API TO STORE DATA

  const token = localStorage.getItem("auth");
  const saveEmotionHistory=async (emotions)=>{
    try{
      const response=await axios.post(
        'http://localhost:5000/api/storeData',
        {
          // prompts: [], // Empty array since we're not storing prompts
          // mindfulVideo: { type: '', allEmotions: [] },
          // mindfulAudio: { type: '', allEmotions: [] }, // This will contain the current session's emotions
          breathVideo: emotions,
          // breathAudio: emotions,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        

        },
      );
      console.log('DATA HAS BEEN SENT SUCCESSFULLY!', response);
    }
    catch(error){
      console.error('Error saving emotion data:', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          {/* <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <img src="/images/Mindwell-black.png" alt="Mindwell Logo" style={{ width: 56, height: 56, marginRight: 8 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  Mindwell
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {['Programs', 'Teachers', 'Blog', 'Our Manifesto', 'Contact Us', 'FAQ', 'Support Center'].map((item) => (
                  <Button key={item} color="inherit">{item}</Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={toggleDarkMode} color="inherit">
                  {darkMode ? <WbSunny /> : <NightsStay />}
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1 }}>28 C°</Typography>
                <IconButton color="inherit">
                  <Notifications />
                </IconButton>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar> */}

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ 
                position: 'relative', 
                height: 250, 
                backgroundImage: 'url(/images/pfbg.jpg)', 
                backgroundSize: 'cover',
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)' 
                }} />
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                  <Typography variant="body2" sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 10 
                  }}>
                    Mindfulness Meditation
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Video Meditation
                  </Typography>
                </Box>
              </Paper>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={8}>
                  {yogaStyles.map((style, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 56, height: 56, borderRadius: 2, mr: 2 }}
                              image={`/images/meditation-${index + 1}.jpg`}
                              alt={`${style.name} image`}
                            />
                            <Typography variant="body1">{style.name}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ 
                              bgcolor: 'action.hover', 
                              px: 1, 
                              py: 0.5, 
                              borderRadius: 10,
                              mr: 2
                            }}>
                              Level {index + 1}
                            </Typography>
                            <IconButton onClick={() => toggleExpand(style.name)}>
                              {expandedStyle === style.name ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                      <Collapse in={expandedStyle === style.name}>
                        <VideoPlayer 
                          videoSrc={style.videoSrc}
                          darkMode={darkMode}
                        />
                      </Collapse>
                    </Card>
                  ))}
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={toggleCameraVisibility}
                    sx={{ mb: 2 }}
                  >
                    {isCameraVisible ? "Hide Camera" : "Show Camera"}
                  </Button>
                  {isCameraVisible && (




                    <Box sx={{ position: 'relative' }}>
                      <Box component="video" ref={videoRef} sx={{ width: '100%', borderRadius: 2 }} />
                      <Box component="canvas" ref={canvasRef} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                      {currentEmotion && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight="bold">
                            Current Emotion: <span>{getEmoji(currentEmotion)} {currentEmotion}</span>
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Emotion History:</Typography>
                        <List>
                          {emotionHistory.map((emotion, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={`${getEmoji(emotion)} ${emotion}`} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Online Video Meditation with Emotions Detection
              </Typography>
              <Typography variant="body1" paragraph>
                Embrace mindfulness with emotion recognition technology that helps you track and improve your mood while meditating.
                From breath awareness to body scanning, explore mindfulness meditation techniques designed to help you cultivate calm and present-moment awareness.
              </Typography>
              
              <Paper sx={{ bgcolor: 'action.hover', borderRadius: 4, p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', mr: 1 }}>
                    {[...Array(3)].map((_, i) => (
                      <Box 
                        key={i} 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: 'grey.400', 
                          borderRadius: '50%', 
                          border: 2, 
                          borderColor: 'background.paper',
                          ml: i > 0 ? -1 : 0
                        }} 
                      />
                    ))}
                  </Box>
                  <Typography variant="body2">
                    Our satisfied users who are taking our sessions regularly
                  </Typography>
                </Box>
                <Typography variant="body2">About Mindwell</Typography>
              </Paper>

              <Paper sx={{ bgcolor: 'action.hover', borderRadius: 4, p: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Pass the mental health test
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ position: 'relative', width: 96, height: 96 }}>
                    <Box
                      sx={{
                        width: 96,
                        height: 96,
                        borderRadius: '50%',
                        border: 8,
                        borderColor: 'warning.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">48%</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">Mental health</Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Developed by Mindwell professionals
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BreathingVideo;