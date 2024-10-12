import {Chat} from "../Models/ChatSchema.js";
import jwt from 'jsonwebtoken'
import Doctor from "../Models/DoctorSchema.js";
import  {Message} from "../Models/MessageSchema.js";
import Review from "../Models/FeedbackSchema.js"; // Corrected typo
import Patient from "../Models/PaitentSchema.js"; // Corrected typo
import FeedbackSchema from "../Models/FeedbackSchema.js";
import Feedback from "../Models/systemFeedback.js";

export const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;
    if (secretKey === process.env.ADMIN_SECRET_KEY) {
        const token = jwt.sign({ secretKey }, process.env.JWT_SECRET_key, {
        expiresIn: "1d",
        });
      res
        .status(200)
        .json({ success: true, message: "Admin Logged In Successfully",token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Secret Key" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getAdminData = async (req,res)=>{
    res.status(200).json({
        admin:true
    })
}
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
          phone: patient.phone,
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
  try {
    const [
      groupsCount,
      patientCount,
      doctorCount,
      messagesCount,
      totalChatsCount,
    ] = await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await Message.find({
      createdAt: {
        $gte: last7Days,
        $lte: today,
      },
    }).select("createdAt");
    console.log(last7DaysMessages);

    const messages = new Array(7).fill(0);
    const dayInMilliseconds = 1000 * 60 * 60 * 24;

    last7DaysMessages.forEach((message) => {
      const indexApprox =
        (today.getTime() - message.createdAt.getTime()) / dayInMilliseconds;
      const index = Math.floor(indexApprox);

      messages[6 - index]++;
    });

    res.status(200).json({
      success: true,
      stats: {
        groupsCount,
        patientCount,
        doctorCount,
        messagesCount,
        totalChatsCount,
        messagesLast7Days: messages,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
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
}

export const getFeedback = async (req, res) => {
  try {
      const feedbacks = await Feedback.find().populate('user', 'name avatar');

      res.status(200).json(feedbacks);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};




