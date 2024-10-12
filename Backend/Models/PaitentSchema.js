import mongoose from "mongoose";

const PaitentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    avatar: { 
      url:String,
      public_id:{
      type: String,
    
      }
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
    },
    
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodType: { type: String },
    //appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
 
}, { timestamps: true });

const Patient = mongoose.model("Patient", PaitentSchema);
export default Patient;
