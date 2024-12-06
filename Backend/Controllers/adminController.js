import { Chat } from "../Models/ChatSchema.js";
import jwt from "jsonwebtoken";
import Doctor from "../Models/DoctorSchema.js";
import { Message } from "../Models/MessageSchema.js";
import Review from "../Models/FeedbackSchema.js"; // Corrected typo
import Patient from "../Models/PaitentSchema.js"; // Corrected typo
import FeedbackSchema from "../Models/FeedbackSchema.js";
import Feedback from "../Models/systemFeedback.js";
import BookingSchema from "../Models/BookingSchema.js";
import { uploadFilesToCloudinary } from "../utils/features.js";
import InteractiveExcerciseVideos from "../Models/InteractiveExcerciseVideos.js";

export const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;
    console.log(secretKey);
    if (secretKey === process.env.ADMIN_SECRET_KEY) {
      const token = jwt.sign({ secretKey }, process.env.JWT_SECRET_key, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Admin Logged In Successfully",
          token,
        });
    } else {
      res.status(401).json({ success: false, message: "Invalid Secret Key" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getAdminData = async (req, res) => {
  res.status(200).json({
    admin: true,
  });
};
export const AllPatients = async (req, res) => {
  try {
    // Fetch all patients and exclude the password field
    const patients = await Patient.find({}).select("-password");

    // Use Promise.all to handle multiple asynchronous calls concurrently
    const transformedPatients = await Promise.all(
      patients.map(async (patient) => {
        const groups = await Chat.countDocuments({
          groupChat: true,
          members: patient._id,
        });
        const friends = await Chat.countDocuments({
          groupChat: false,
          members: patient._id,
        });

        return {
          _id: patient._id,
          name: patient.name,
          email: patient.email,
          role: patient.role,
          avatar: patient.avatar.url,
          groups,
          friends,
        };
      })
    );

    res.status(200).json({ success: true, transformedPatients });
  } catch (error) {
    console.error("Error fetching patients:", error); // Log error for debugging
    res.status(500).json({ success: false, message: "Failed to get Patients" });
  }
};

export const AllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "Failed to get Doctors" });
  }
}


export const AllChats = async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
      chats.map(async (chat) => {
        const totalMessages = await Message.countDocuments({ chat: chat._id });
        return {
          _id: chat._id,
          name: chat.name,
          avatar: chat.members.slice(0, 3).map((member) => member.avatar),
          members: chat.members.map((member) => {
            return {
              _id: member._id,
              name: member.name,
              avatar: member.avatar.url,
            };
          }),
          creator: {
            name: chat.creator?.name || "None",
            avatar: chat.creator?.avatar.url || "",
          },
          totalMembers: chat.members.length,
          totalMessages,
        };
      })
    );

    res.status(200).json({ success: true, transformedChats });
  } catch (error) {
    console.error("Error fetching chats:", error); // Log error for debugging
    res.status(500).json({ success: false, message: "Failed to get Chats" });
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");

    const transformedMessages = messages.map(
      ({ content, attachments, _id, sender, createdAt, chat }) => {
        // Check if chat or sender is not null
        if (!chat || !sender) {
          console.warn("Chat or sender is null for message ID:", _id);
          return null; // Skip this message
        }

        return {
          _id,
          attachments,
          content,
          createdAt,
          chat: chat._id,
          groupChat: chat.groupChat,
          sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar?.url, // Use optional chaining
          },
        };
      }
    );

    // Filter out any null entries from transformedMessages
    const validMessages = transformedMessages.filter(
      (message) => message !== null
    );

    res.status(200).json({
      success: true,
      messages: validMessages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

export const getDashboardStats = async (req, res) => {
  console.log("Fetching dashboard stats...");
  try {
    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);

    // Use Promise.all for multiple parallel queries
    const [
      groupsCount,
      patientCount,
      doctorCount,
      messagesCount,
      totalChatsCount,
      individualChatsCount,
      last7DayAppointments,
      totalAppointments,
    ] = await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
      Chat.countDocuments({ groupChat: false }),
      BookingSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gte: last7Days,
              $lte: today,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
      ]),
      BookingSchema.countDocuments(),
    ]);

    // Prepare messages count for the last 7 days
    const appointmentsLast7Days = new Array(7).fill(0);
    last7DayAppointments.forEach(({ _id, count }) => {
      const date = new Date(_id);
      const dayIndex = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        appointmentsLast7Days[6 - dayIndex] = count; // 6 - dayIndex to reverse the order
      }
    });

    // Send the response
    res.status(200).json({
      success: true,
      stats: {
        groupsCount,
        totalUsers: patientCount + doctorCount,
        patientCount,
        doctorCount,
        messagesCount,
        totalChatsCount,
        individualChatsCount,
        appointmentsLast7Days,
        totalAppointments
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({
      success: false,
      message: `Failed to fetch dashboard stats: ${error.message}`,
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("doctor", "name");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Failed to get Reviews" });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name avatar");

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: "pending" });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Approve doctor by ID
export const approveDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { request } = req.body;

    console.log("Doctor ID:", doctorId);

    let updatedDoctor;

    // Handle 'cancelled' request
    if (request === "cancelled") {
      updatedDoctor = await Doctor.findByIdAndUpdate(
        doctorId,
        { isApproved: "cancelled" },
        { new: true }
      );

      // Send response immediately and return to avoid further execution
      return res.status(200).json({
        message: "Doctor request has been cancelled",
        doctor: updatedDoctor,
      });
    }

    // Handle 'approved' request
    updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { isApproved: "approved" },
      { new: true }
    );

    // Send response for the 'approved' case
    res.status(200).json({
      message: "Doctor has been approved successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error approving/cancelling doctor:", error);

    // Send error response only once
    res.status(500).json({ error: "Failed to process doctor request" });
  }
};


export const uploadVideo = async (req, res) => {
  const { title, description,category } = req.body;
  const file = req.file;
  console.log(file)
  let video;
  try {
    if (file) {
      const result = await uploadFilesToCloudinary([file]);
      if (!result || !result[0] || !result[0].public_id || !result[0].url) {
        return res.status(500).json({ status: false, message: "Failed to upload video" });
      }
      console.log("here is the result",result)
     video = {
        public_id: result[0].public_id,
        url: result[0].url,
      };
    }

console.log("video",video)
  
    const InteractiveExerciseVideo = new InteractiveExcerciseVideos({
      title,
      description,
      category,
      video,
      
    });

    await InteractiveExerciseVideo.save();
   
   
    res.status(201).json({success:"Interactive excercise video submitted successfully",InteractiveExerciseVideo});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

