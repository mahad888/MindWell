import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, ChevronUp, Sun, Moon, User } from 'lucide-react';
import * as faceapi from 'face-api.js';

const Testing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [expandedStyle, setExpandedStyle] = useState(null);
  const [emotions, setEmotions] = useState([]);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const detectionRef = useRef(null);

  const emotionEmojis = {
    neutral: '😐', happy: '😊', sad: '😢', angry: '😠',
    fearful: '😨', disgusted: '🤢', surprised: '😲',
  };

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
        setEmotions(prev => [...prev, { emotion: dominantEmotion, timestamp: new Date().toISOString() }]);
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
    detectEmotions();
  };

  const stopDetection = () => {
    if (detectionRef.current) {
      cancelAnimationFrame(detectionRef.current);
      detectionRef.current = null;
    }
    console.log('Emotions data to be saved:', emotions);
  };

  const getEmoji = (emotion) => emotionEmojis[emotion] || '❓';

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-6xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-lg overflow-hidden`}>
        
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <img src="/images/Mindwell-black.png" alt="Mindwell Logo" className="w-14 h-14" />
            <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-black'}`}>Mindwell</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            {['Programs', 'Teachers', 'Blog', 'Our Manifesto', 'Contact Us', 'FAQ', 'Support Center'].map((item) => (
              <a key={item} href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className={`${darkMode ? 'text-yellow-300' : 'text-gray-600'}`}>
              {darkMode ? <Moon /> : <Sun />}
            </button>
            <span className={darkMode ? 'text-white' : 'text-black'}>28 C°</span>
            <Bell className={darkMode ? 'text-white' : 'text-gray-600'} />
            <User className={darkMode ? 'text-white' : 'text-gray-600'} />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
          
          {/* Left Column */}
          <div className="md:w-2/3 space-y-6">
            
            {/* Meditation Banner */}
            <div className="relative rounded-3xl overflow-hidden">
              <img src="/images/pfbg.jpg" alt="Yoga landscape" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Mindfulness Meditation</span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">Video Meditation</h2>
              </div>
            </div>

            {/* Yoga Styles and Camera */}
            <div className="flex space-x-4">
              {/* Yoga Styles */}
              <div className="w-2/3 space-y-4">
                {yogaStyles.map((style, index) => (
                  <div key={index} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center space-x-4">
                        <img src={`/images/meditation-${index + 1}.jpg`} alt={`${style.name} image`} className="w-14 h-14 rounded-lg" />
                        <span className={darkMode ? 'text-white' : 'text-black'}>{style.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} px-2 py-1 rounded-full text-sm`}>
                          Level {index + 1}
                        </span>
                        <button onClick={() => toggleExpand(style.name)}>
                          {expandedStyle === style.name ? (
                            <ChevronUp className={darkMode ? 'text-white' : 'text-black'} />
                          ) : (
                            <ChevronDown className={darkMode ? 'text-white' : 'text-black'} />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedStyle === style.name && (
                      <div className="mt-4">
                        <video controls className="w-full rounded-lg" src={style.videoSrc}>
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Camera and Emotion Detection */}
              <div className="w-1/3">
                <button
                  onClick={toggleCameraVisibility}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                >
                  {isCameraVisible ? "Hide Camera" : "Show Camera"}
                </button>
                {isCameraVisible && (
                  <div className="relative">
                    <video ref={videoRef} className="w-full rounded-lg" />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                    {currentEmotion && (
                      <div className="mt-4 text-center">
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                          Current Emotion: <span>{getEmoji(currentEmotion)} {currentEmotion}</span>
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Online Video Meditation with Emotions Detection</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Embrace mindfulness with emotion recognition technology that helps you track and improve your mood while meditating.
                From breath awareness to body scanning, explore mindfulness meditation techniques designed to help you cultivate calm and present-moment awareness.
              </p>
            </div>
            
            {/* Satisfied Users Section */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Our satisfied users who are taking our sessions regularly</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>About Mindwell</p>
            </div>

            {/* Mental Health Test Section */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4`}>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Pass the mental health test</h3>
              <div className="flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-8 border-orange-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>48%</span>
                  </div>
                </div>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mental health</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Developed by Mindwell professionals</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Testing;