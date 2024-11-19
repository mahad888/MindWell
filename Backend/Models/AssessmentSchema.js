// import mongoose from "mongoose";



// const assessmentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
//   results: { type: Number, enum: [0, 1], required: true },
  
// },{timestamps:true});

// const Assessment= mongoose.model('Assessment', assessmentSchema);
// export default Assessment;

import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  surveyResponses: [{ 
    question: { type: String, required: true },
    column: { type: String, required: true },
    selectedAnswer: { type: String, required: true }
  }],
  results: { 
    type: Number, 
    enum: [0, 1], 
    required: true 
  }
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;