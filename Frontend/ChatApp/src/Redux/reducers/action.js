export const storeMindVideo = (mindVideo) => {
    return {
      type: 'MINDFULNESS_VIDEO',
      payload: mindVideo,
    };
  };
  
  export const storeMindAudio = (mindAudio) => {
    return {
      type: 'MINDFULNESS_AUDIO',
      payload: mindAudio,
    };
  };
  
  export const storeBreathingVideo = (breathingVideo) => {
    return {
      type: 'BREATHING_VIDEO',
      payload: breathingVideo,
    };
  };
  
  export const storeBreathingAudio = (breathingAudio) => {
    return {
      type: 'BREATHING_AUDIO',
      payload: breathingAudio,
    };
  };
  