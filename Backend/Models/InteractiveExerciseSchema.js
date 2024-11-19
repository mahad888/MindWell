import mongoose from "mongoose";

const InteractiveExerciseSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store date as 'YYYY-MM-DD' format
  prompts: [{
    question: String,
    answer: { type: String, default: '' }
  }],
  mindfulnessVideo: {
    type: { type: String, default: '' },
    allEmotions: [{ type: mongoose.Schema.Types.Mixed }]
  },
  mindfulnessAudio: {
    type: { type: String, default: '' },
    allEmotions: [{ type: mongoose.Schema.Types.Mixed }]
  },
  breathingVideo: {
    type: { type: String, default: '' },
    allEmotions: [{ type: mongoose.Schema.Types.Mixed }]
  },
  breathingAudio: {
    type: { type: String, default: '' },
    allEmotions: [{ type: mongoose.Schema.Types.Mixed }]
  },
}, { timestamps: true });

// Change to ES6 export
export default mongoose.model('InteractiveExercise', InteractiveExerciseSchema);