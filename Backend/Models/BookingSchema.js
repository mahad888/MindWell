import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },
    appointmentStatus:{
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    timeSlot: {
      type: Object
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    meetingCode: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);