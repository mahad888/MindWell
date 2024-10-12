
import Mood from '../Models/MoodSchema.js';


export const mood = async (req, res) => {
    const { userId, mood } = req.body;
    try {
        const newMood = new Mood({ userId, mood, date: new Date() });
        const savedMood = await newMood.save();
        res.json(savedMood);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export const moodHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await Mood.find({ userId }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const suggestionsData = {
    Happy: ['Listen to your favorite music', 'Watch a comedy movie', 'Go for a walk'],
    Sad: ['Talk to a friend', 'Write down your thoughts', 'Practice mindfulness meditation'],
    Angry: ['Take deep breaths', 'Do some physical activity', 'Listen to calming music'],
    Anxious: ['Practice deep breathing', 'Write a journal entry', 'Do a quick workout'],
    Calm: ['Enjoy some tea', 'Read a book', 'Meditate for a few minutes']
};

// Get suggestions based on mood
export const suggestions = async (req, res) => {
    const { mood } = req.query;
    const suggestions = suggestionsData[mood] || [];
    res.json(suggestions);
};

