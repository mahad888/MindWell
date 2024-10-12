import { NEW_REQUEST, REFETCH_CHATS } from "../Constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import Booking from "../Models/BookingSchema.js";
import { Chat } from "../Models/ChatSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import Patient from "../Models/PaitentSchema.js";
import { Request } from "../Models/RequestSchema.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";

export const updatePatient = async (req, res) => {

  const updateData = req.body;
  const file = req.file;
  try {
    if (file) {
      const result = await uploadFilesToCloudinary([file]);
      if (!result || !result[0] || !result[0].public_id || !result[0].url) {
        return res.status(500).json({ status: false, message: "Failed to upload avatar" });
      }
      console.log(result)
      updateData.avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
      };
    }
    const updatePatient = await Patient.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    });
    if (!updatePatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    res
      .status(200)
      .json({ message: "Patient updated Successfully", updatePatient });
  } catch (err) {
    res.status(500).json({ message: "Failed to update patient" });
    console.log(err)
  }
};

export const deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const deletePatient = await Patient.findByIdAndDelete(id);
    if (!deletePatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete patient" });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).select("-password");
    res.status(200).json({ patients });
  } catch (err) {
    res.status(500).json({ message: "Failed to get patients" });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.userId).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ sucesss: true, patient });
  } catch (err) {
    res.status(500).json({ message: "Failed to get patient" });
  }
};

export const getAppointmnets = async (req, res) => {
  try{

    const bookings = await Booking.find({ user: req.userId }).populate(
      "patient",
      "name avatar"
  
    );
  
    const doctorIds = bookings.map((booking) => booking.doctor._id);
    const doctor = await Doctor.find({ _id: { $in: doctorIds } });
  
    res.status(200).json({ success: true, message:"Appointments are getting", bookings, doctor });
  }
  catch(err){
    res.status(500).json({ message: "Failed to get appointments" }); 
  

};

}

export const searchPatient = async (req, res) => {
  const { name } = req.query;
  try {
    const myChats = await Chat.find({ groupChat: false, members: req.userId });
    const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();
    const allUsersExpceptMeAndFriends = await Patient.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });

    const users = allUsersExpceptMeAndFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to search patients" });
  }
};

export const sendFriendRequest = async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.userId, receiver: userId },
      { sender: userId, receiver: req.userId },
    ],
  });

  if (request) return res.status(400).json({ message: "Request already sent" });

  await Request.create({
    sender: req.userId,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
};

export const acceptFriendRequest = async (req, res, next) => {
  const { requestId, accept } = req.body;
  console.log(requestId, accept);

  try {
    // Find the request and populate the sender and receiver details
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    // Check if the request exists
    console.log(request);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Ensure the logged-in user is the intended receiver of the request
    if (request.receiver._id.toString() !== req.userId.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to accept this request" });
    }

    // If the request is rejected, delete it and respond accordingly
    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Friend Request Rejected",
      });
    }

    // If the request is accepted, create a chat and delete the request
    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);

    // Emit an event to refresh the chat list for both users
    emitEvent(req, REFETCH_CHATS, members);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
      senderId: request.sender._id,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing the request" });
  }
};

export const getMyNotifications = async (req, res) => {
  try {
    // Fetch requests where the receiver is the current user, and populate the sender's name and avatar
    const requests = await Request.find({ receiver: req.userId }).populate(
      "sender",
      "name avatar"
    );

    // Map through requests and extract relevant data, with safety checks
    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender?._id,
        name: sender?.name,
        avatar: sender?.avatar?.url, // Using optional chaining to avoid potential errors
      },
    }));

    // Send the response with the collected data
    return res.status(200).json({
      success: true,
      allRequests,
    });
  } catch (err) {
    // Log the error and send a 500 response if something goes wrong
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notifications.",
    });
  }
};

export const getAllFriends = async (req, res) => {
  const chatId = req.query.chatId;

  try {
    const chats = await Chat.find({
      members: req.userId,
      groupChat: false,
    }).populate("members", "name avatar");

    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.userId);

      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });

    if (chatId) {
      const chat = await Chat.findById(chatId);

      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );

      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve friends.",
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Patient.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => Patient.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, avatar }) => {
        return { _id, name, occupation, location, avatar };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await Patient.findById(id);
    const friend = await Patient.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => Patient.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return { _id, name, occupation, location, avatar };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};