import Paitent from "../Models/PaitentSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendEmail from '../Middleware/EmailSender.js';
import { uploadFilesToCloudinary} from "../utils/features.js";

export const register = async (req, res) => {
  const { email, password, name, role, gender } = req.body;
  const file = req.file;

  try {
    let user = null;

    // Check if the user already exists based on the role
    if (role === "patient") {
      user = await Paitent.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!file) {
      return res.status(401).json({ status: false, message: "Please upload avatar" });
    }

    // Upload the file to Cloudinary and handle potential errors
    const result = await uploadFilesToCloudinary([file]);
    console.log(result)

    // Check if the result is valid and contains the necessary properties
    if (!result || !result[0] || !result[0].public_id || !result[0].url) {
      return res.status(500).json({ status: false, message: "Failed to upload avatar" });
    }

    // Construct the avatar object
    const avatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user based on the role
    if (role === "patient") {
      user = new Paitent({
        email,
        password: hashedPassword,
        name,
        role,
        gender,
        avatar,
        viewedProfile:Math.floor(Math.random() * 10000),
      });
    } else if (role === "doctor") {
      user = new Doctor({
        email,
        password: hashedPassword,
        name,
        role,
        gender,
        avatar,
      });
    }

    // Save the user
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide email and password" });
      }
      let user = null;
      const patient = await Paitent.findOne({ email });
      const doctor = await Doctor.findOne({ email });
      if (patient) {
        user = patient;
      } else if (doctor) {
        user = doctor;
      }
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
          return res.status(400).json({ status:false, message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_key, {
        expiresIn: '15d',
      });
      const { password: userPassword, appointments, ...rest } = user._doc;
        res.status(200).json({ status:'true',message: "User logged in successfully",token, user: { ...rest}});
    } catch (error) {
      console.log(error);
      res.status(500).json({status:false, message: "Failed to login" });
    }
  };

  export const forgetPassword = async (req, res) => {

      const { email } = req.body;
      try {
        const patient = await Paitent.findOne({ email });
        const doctor = await Doctor.findOne ({ email });
        if (!patient && !doctor) {
          return res.status(404).json({ message: "User not found" });
        }
        const user = patient || doctor;
        const token = jwt.sign({email:user.email, id: user._id }, process.env.JWT_SECRET_key, {
          expiresIn: '15d',
        });
        console.log(token)
        const link = `http://localhost:5173/resetPassword/${user._id}/${token}`;
        sendEmail(user.email,"Password Reset", `Click here to reset your password: ${link}`)
        res.status(200).json({ message: "Password reset link sent to your email" });
        console.log(user.email)
      }
        catch(error){
          console.log(error);
          res.status(500).json({ message: "Failed to send email" });
        }
      }



export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  console.log(id,token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
    console.log(decoded)
    if (decoded.id !== id) {
      return res.status(400).json({ message: "Invalid token or user ID" });
    }

    const user = await Paitent.findById(id) || await Doctor.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
