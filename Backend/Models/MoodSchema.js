// Mood model (models/Mood.js)
import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    mood: String,
    date: Date
});

const Mood = mongoose.model('Mood', MoodSchema);

export default Mood;
