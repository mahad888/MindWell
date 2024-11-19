import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  avatar: { 
    url:String,
    public_id:{
    type: String,
  required: true,
    }
  },
  appointmentFee: { type: Number,
    default: 1000
   },
  role: { type: String },

  specialization: { type: String},
  qualifications: [
    {
      degree: { type: String,  },
      university: { type: String,  },
      startDate: { type: Date, },
      endDate: { type: Date },
    },
  ],
  experiences: [
    { 
      position: { type: String,},
      hospital: { type: String,},
      startDate: { type: Date,},
      endDate: { type: Date },
    },
  ],

  bio: { type: String, maxlength: 200 },
  about: { type: String },
  timeSlots: [
    {
      day: { type: String, },
      startTime: { type: String,}, // Store as "HH:mm" or Date object
      endTime: { type: String,},
      available: { type: Boolean, default: true },
    },
  ],

  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["created","pending", "approved", "cancelled"],
    default: "created",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
