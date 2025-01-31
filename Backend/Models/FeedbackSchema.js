import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    paitent: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);