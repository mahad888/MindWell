import mongoose from "mongoose";
import Doctor from "../Models/DoctorSchema.js";
import Review from "../Models/FeedbackSchema.js"; // Corrected typo

export const getSingleDoctorFeedback = async (req, res) => {
  console.log("getSingleDoctorFeedback");
  const { doctorId } = req.params;
  console.log(doctorId);

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Doctor ID" });
  }

  try {
    const doctorFeedback = await Review.find({ doctor: doctorId }).populate(
      "paitent",
      "name avatar"
    );

    const tranformFeedback = await Promise.all(
      doctorFeedback.map(async (review) => {
        const totalRating = await Review.countDocuments({ doctor: doctorId });

        const totalRatingSum = doctorFeedback.reduce(
          (sum, review) => sum + review.rating,
          0
        );

        const avgRating = totalRatingSum / totalRating;
        return {
          _id: review._id,
          doctor: review.doctor,
          patient: review.paitent.name,
          avatar: review.paitent.avatar.url,
          comment: review.comment,
          rating: review.rating,
          totalRating,
          avgRating,
        };
      })
    );

    if (!doctorFeedback || doctorFeedback.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor Feedback not found" });
    }

    res.status(200).json({ success: true, feedback:tranformFeedback });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get Doctor Feedback" });
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
