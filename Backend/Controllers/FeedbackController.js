import  Feedback from '../Models/systemFeedback.js';

export const submitFeedback = async (req, res) => {
    const {ratings, comments } = req.body;
    console.log(req.body)

    try {
        const feedback = new Feedback({
            user:req.userId,
            ratings,
            comments,
        });


        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


