import mongoose from "mongoose";
import Doctor from "../Models/DoctorSchema.js";
import Review from "../Models/FeedbackSchema.js"; // Corrected typo


export const getSingleDoctorFeedback = async (req, res) => {
  console.log("getSingleDoctorFeedback called");
  const { doctorId } = req.params;
  console.log('eresfsfsddf')

  // Validate doctorId
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ 
      success: false, message: "Invalid Doctor ID" 
    });
  }

  try {
    // Fetch all feedback for the doctor along with patient details
    const doctorFeedback = await Review.find({ doctor: doctorId })
      .populate('paitent', 'name avatar')
      .exec();

    if (!doctorFeedback.length) {
      return res.status(404).json({ 
        success: false, message: "Doctor Feedback not found" 
      });
    }

    // Calculate total ratings and average rating
    const totalRating = doctorFeedback.length;
    const totalRatingSum = doctorFeedback.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRatingSum / totalRating;

    // Transform feedback data
    const transformedFeedback = doctorFeedback.map(review => ({
      _id: review._id,
      doctor: review.doctor,
      patient: review.paitent.name,
      avatar: review.paitent.avatar.url,
      comment: review.comment,
      rating: review.rating,
    }));

    // Send the response
    res.status(200).json({ 
      success: true, 
      feedback: transformedFeedback, 
      totalRating, 
      avgRating 
    });

  } catch (err) {
    console.error("Error fetching doctor feedback:", err);
    res.status(500).json({ 
      success: false, message: "Failed to get Doctor Feedback" 
    });
  }
};


export const createDoctorFeedback = async (req, res) => {
  const { doctorId } = req.params;
  const { rating, comment } = req.body;

  try {
    const newReview = new Review({
      doctor: doctorId,
      paitent: req.userId,
      rating,
      comment,
    });
    await newReview.save();
    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { reviews: newReview._id },
      $inc: { rating: rating },
    });

    res
      .status(201)
      .json({ success: true, message: "Review added successfully" , review: newReview});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to add review" });
  }
};
