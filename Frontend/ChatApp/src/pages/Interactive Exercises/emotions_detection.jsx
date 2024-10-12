

import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const EmotionDetection = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [emotions, setEmotions] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const detectionInterval = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const emotionEmojis = {
    neutral: '😐',
    happy: '😊',
    sad: '😢',
    angry: '😠',
    fearful: '😨',
    disgusted: '🤢',
    surprised: '😲'
  };

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    loadModels();
    initializeCamera();
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsCameraReady(true);
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Failed to access the camera. Please ensure you have given permission.");
    }
  };

  const toggleCameraVisibility = () => {
    setIsCameraVisible(!isCameraVisible);
  };

  const detectEmotions = async () => {
    if (!videoRef.current || !isCameraReady) return;

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
      setEmotions(prev => [...prev, dominantEmotion]);
    } else {
      setCurrentEmotion('no face');
    }
  };

  const startDetection = () => {
    if (!isCameraReady) {
      alert("Camera is not ready. Please wait or refresh the page.");
      return;
    }
    setIsDetecting(true);
    setEmotions([]);
    detectionInterval.current = setInterval(detectEmotions, 1000); // Detect every second
    setTimeout(() => {
      stopDetection();
    }, 120000); // Run for 2 minutes
  };

  const stopDetection = () => {
    clearInterval(detectionInterval.current);
    setIsDetecting(false);
  };

  const getEmoji = (emotion) => emotionEmojis[emotion] || '❓';

  return (
    <div>
      <div style={{ position: 'relative', width: '640px', height: '480px' }}>
        <video 
          ref={videoRef}
          style={{ 
            width: '100%', 
            height: '100%', 
            display: isCameraVisible ? 'block' : 'none' 
          }} 
          autoPlay 
          muted 
        />
        <canvas ref={canvasRef} style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          display: isCameraVisible ? 'block' : 'none' 
        }} />
      </div>
      <div>
        <button onClick={toggleCameraVisibility}>
          {isCameraVisible ? 'Hide Camera' : 'Show Camera'}
        </button>
        <button onClick={startDetection} disabled={isDetecting || !isCameraReady}>
          Start Emotion Detection
        </button>
        <button onClick={stopDetection} disabled={!isDetecting}>
          Stop Emotion Detection
        </button>
      </div>
      <div style={{ fontSize: '48px', marginTop: '10px' }}>
        Current Emotion: {getEmoji(currentEmotion)}
      </div>
      <div style={{ fontSize: '24px', marginTop: '10px' }}>
        Detected Emotions: {emotions.map(e => getEmoji(e)).join(' ')}
      </div>
    </div>
  );
};

export default EmotionDetection;