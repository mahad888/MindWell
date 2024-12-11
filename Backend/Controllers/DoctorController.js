import Assessment from "../Models/AssessmentSchema.js";
import Booking from "../Models/BookingSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import { Message } from "../Models/MessageSchema.js";
import Post from "../Models/PostSchema.js";

import { uploadFilesToCloudinary } from "../utils/features.js";
import bcrypt from "bcrypt";

export const updateDoctor = async (req, res) => {
  const updateData = req.body;
  const file = req.file;
  console.log(file)
  console.log(updateData)
  updateData.qualifications = JSON.parse(updateData.qualifications);
  updateData.experiences = JSON.parse(updateData.experiences);
  updateData.timeSlots = JSON.parse(updateData.timeSlots);
 

  try {

    if (file) {
      const result = await uploadFilesToCloudinary([file]);
      if (!result || !result[0] || !result[0].public_id || !result[0].url) {
        return res.status(500).json({ status: false, message: "Failed to upload avatar" });
      }
      console.log(
        result)
      updateData.avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
      };
    }
  
    const updateDoctor = await Doctor.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    });
    
    if (!updateDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res
      .status(200)
      .json({ message: "Doctor updated Successfully", updateDoctor });
  } catch (err) {
    res.status(500).json({ message: "Failed to update Doctor" });
    console.log(err)
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(id);
    if (!deleteDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete Doctor" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;

    // Create search filter object
    let searchFilter = { isApproved: "approved" };

    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
        // { experiences: { $regex: query, $options: "i" } },
        // { qualifications: { $regex: query, $options: "i" } },
      ];

      // Add appointmentFee as a condition only if the query is a number
      if (!isNaN(query)) {
        searchFilter.$or.push({ appointmentFee: query });
      }
    }

    // Sorting options (default is by name, ascending)
    const sortOptions = {
      [sortBy]: sortOrder === 'desc' ? -1 : 1,
    };

    // Pagination logic
    const skip = (page - 1) * limit;

    // Query the database with filter, sort, pagination, and projection (excluding password)
    const doctors = await Doctor.find(searchFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password");
      console.log(doctors)

    // Count total doctors for pagination
    const totalDoctors = await Doctor.countDocuments(searchFilter);

    // Return the doctors with pagination info
    res.status(200).json({
      doctors,
      currentPage: page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalDoctors,
    });

  } catch (err) {
    console.error('Error fetching doctors:', err.message, err.stack);
    res.status(500).json({ message: "Failed to get Doctors" });
  }
};

export const getDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ sucesss: true, Doctor: doctor});
  } catch (err) {
    res.status(500).json({ message: "Failed to get Doctor" });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.userId).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointments = await Booking.find({ doctor: req.userId }).populate(
      "user",
      "name avatar"
    ); 


    res.status(200).json({ sucesss: true, Doctor: doctor ,appointments});
  } catch (err) {
    res.status(500).json({ message: "Failed to get Doctor" });
  }
}

export const sendApprovalRequest = async (req, res) => {
  const id = req.userId;
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, { isApproved: "pending" }, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Approval request sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send approval request" });
  }
}


export const getDoctorAppointments = async (req, res) => {
  try {
    // Fetch bookings with 'pending' status for the logged-in doctor
    let bookings = await Booking.find({
      doctor: req.userId,
      appointmentStatus: "pending",
    }).populate("patient", "name avatar email gender");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // Sort bookings by the earliest time in their timeSlots
    bookings = bookings.sort((a, b) => {
      // Extract the earliest `startTime` from `timeSlots`, default to `Infinity` if missing
      const earliestA = new Date(
        a.timeSlots?.find((slot) => slot.available === false)?.startTime || Infinity
      );
      const earliestB = new Date(
        b.timeSlots?.find((slot) => slot.available === false)?.startTime || Infinity
      );

      // Compare the two dates
      return earliestA - earliestB;
    });

    // Send the sorted bookings
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Failed to get appointments" });
  }
};


export const getAssessmentsOfPatient = async (req, res) => {
  
  try {
    const { id } = req.params;
    console.log(id)
    const assessment = await Assessment.find({userId:id}).populate('userId');
    console.log(assessment)
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    res.status(200).json({sucess:true ,assessment});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getLast7DaysNegativePosts = async (req, res) => {
  const {id} = req.params;
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const negativePosts = await Post.countDocuments({
      userId:id,
      postType: 'negative',
      createdAt: { $gte: sevenDaysAgo },
    });

    const neutralPosts = await Post.countDocuments({
      userId:id,
      postType: 'neutral',
      createdAt: { $gte: sevenDaysAgo },
    });

    return res.status(200).json({
      negativePosts,
      neutralPosts,
      message: 'Successfully fetched posts from the last 7 days.',
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getLast7DaysNegativeMessages = async (req, res) => {
  const {id} = req.params;
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const negativeMessages = await Message.countDocuments({
      sender:id,
      messageType: 'negative',
      createdAt: { $gte: sevenDaysAgo },
    });

    const neutralMessages = await Message.countDocuments({
      sender:id,
      messageType: 'neutral',
      createdAt: { $gte: sevenDaysAgo },
    });

    return res.status(200).json({
      negativeMessages,
      neutralMessages,
      message: 'Successfully fetched messages from the last 7 days.',
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getNegativeAndNeutralPostAfterDoctorsAppointment = async (req, res) => {
  const { id } = req.params;
console.log(id)
  try {
    // Find all appointments for the given doctor and patient
    const appointments = await Booking.find({ doctor: req.userId, patient: id, appointmentStatus: 'completed' });
    console.log(appointments)

    if (!appointments || appointments.length === 0 || appointments == []) {
      return res.status(404).json({ message: 'No appointments found' });

    }

    // Get the latest appointment
    const latestAppointment = appointments[appointments.length - 1];

    // Validate the latest appointment
    if (!latestAppointment || !latestAppointment.updatedAt) {
      return res.status(404).json({ message: 'No valid appointment data found' });
    }

    // Query posts for both negative and neutral types since the latest appointment
    const posts = await Post.find({
      userId: id,
      postType: { $in: ['negative', 'neutral'] }, // Match negative or neutral post types
      createdAt: { $gte: latestAppointment.updatedAt },
    });

    // Filter posts by type
    const Negativeposts = posts.filter((post) => post.postType === 'negative');
    const Neutralposts = posts.filter((post) => post.postType === 'neutral');

    // Return counts and posts
    return res.status(200).json({
      negativeCount: Negativeposts.length,
      neutralCount: Neutralposts.length,
      Negativeposts,
      Neutralposts,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNegativeAndNeutralMessagesAfterDoctorsAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find all appointments for the given doctor and patient
    const appointments = await Booking.find({ doctor: req.userId, patient: id ,appointmentStatus:'completed'});
    console.log(appointments)

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    // Get the latest appointment
    const latestAppointment = appointments[appointments.length - 1];

    // Validate the latest appointment
    if (!latestAppointment || !latestAppointment.updatedAt) {
      return res.status(404).json({ message: 'No valid appointment data found' });
    }

    // Query messages for both negative and neutral types since the latest appointment
    const messages = await Message.find({
      sender: id,
      messageType: { $in: ['negative', 'neutral'] }, // Match negative or neutral message types
      createdAt: { $gte: latestAppointment.updatedAt },
    });

    // Filter messages by type
    const NegativeMessages = messages.filter((message) => message.messageType === 'negative');
    const NeutralMessages = messages.filter((message) => message.messageType === 'neutral');

    // Return counts and messages
    return res.status(200).json({
      negativeCount: NegativeMessages.length,
      neutralCount: NeutralMessages.length,
      NegativeMessages,
      NeutralMessages,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export const getProgressTrackings = async (req, res) => {
  const {id} = req.params;
  try {
    const progressTrackings = await ProgressTracking.find({userId:id});
    if (!progressTrackings) return res.status(404).json({ message: 'Progress Trackings not found' });
    res.status(200).json({sucess:true ,progressTrackings});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}