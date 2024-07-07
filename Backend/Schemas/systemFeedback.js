import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    ratings: {
        ui: { type: Number, required: true },
        navigation: { type: Number, required: true },
        assessment: { type: Number, required: true },
        aiAssessment: { type: Number, required: true },
        exercises: { type: Number, required: true },
        chat: { type: Number, required: true },
        scheduling: { type: Number, required: true },
        tracking: { type: Number, required: true },
        progressVisuals: { type: Number, required: true },
        community: { type: Number, required: true },
        communityWall: { type: Number, required: true },
        overall: { type: Number, required: true },
        recommend: { type: Number, required: true },
    },
    comments: { type: String, required: true },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
