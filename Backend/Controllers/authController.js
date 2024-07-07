import Paitent from "../Schemas/PaitentSchema.js";
import Doctor from "../Schemas/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendEmail from '../Middleware/EmailSender.js';

export const register = async (req, res) => {
  const { email, password, name, role, gender } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    let user = null;
    if (role === "patient") {
      user = await Paitent.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (role === "patient") {
      user = new Paitent({
        email,
        password: hashedPassword,
        name,
        role,
        gender,
        photo,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        email,
        password: hashedPassword,
        name,
        role,
        gender,
        photo,
      });
    }

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
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
      const { password: userPassword, role, appointments, ...rest } = user._doc;
        res.status(200).json({ status:'true',messsage: "User logged in successfully",token, data: { ...rest},role });
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
