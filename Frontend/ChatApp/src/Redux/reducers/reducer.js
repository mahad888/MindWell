const initialState = {
    mindVideo: null,
    mindAudio: null,
    breathingAudio: null,
    breathingVideo: null,
  };
  
  const jsonReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MINDFULNESS_VIDEO':
        return {
          ...state,
          mindVideo: action.payload,
        };
      case 'MINDFULNESS_AUDIO':
        return {
          ...state,
          mindAudio: action.payload,
        };
      case 'BREATHING_VIDEO':
        return {
          ...state,
          breathingVideo: action.payload, // Make sure this key matches the state object
        };
      case 'BREATHING_AUDIO':
        return {
          ...state,
          breathingAudio: action.payload,
        };
      default:
        return state; // Always return the default state if action type is unknown
    }
  };
  
  export default jsonReducer;
  