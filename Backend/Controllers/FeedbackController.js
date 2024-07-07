import  Feedback from '../Schemas/systemFeedback.js';

export const submitFeedback = async (req, res) => {
    const {ratings, comments } = req.body;
    console.log(req.body)
    const userId = '6643e899131f7b2031ffd8c0'

    try {
        const feedback = new Feedback({
            userId,
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
