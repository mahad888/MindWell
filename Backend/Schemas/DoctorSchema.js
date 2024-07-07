import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },
  apppointmentFee: { type: Number },
  role: { type: String },

  specialization: { type: String },
  qualifications: [{ type: String }],
  experiences: [{ type: String }],

  bio: { type: String, maxlength: 50 },
  about: { type: String },
  timeSlots: [{ type: String }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
