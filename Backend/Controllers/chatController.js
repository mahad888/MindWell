import { getRounds } from "bcrypt";
import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../Constants/event.js";
import { Chat } from "../Models/ChatSchema.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import { getOtherMember } from "../lib/helper.js";
import { name } from "ejs";
import Patient from "../Models/PaitentSchema.js";
import { Message } from "../Models/MessageSchema.js";

export const newGroupChat = async (req, res) => {
  const { name, members } = req.body;
  console.log("Members:", members);
  console.log("UserId", req.userId);
  try {
    if (members.length < 2) {
      return res.status(400).json({
        message: "Please add atleast 2 members to create a gruop chat",
      });
    }
    const allMembers = [...members, req.userId];
    console.log(allMembers);
    const chat = new Chat({
      name,
      groupChat: true,
      creator: req.userId,
      members: allMembers,
    });
    await chat.save();
    emitEvent(req, ALERT, allMembers, {
      message: `${name} created a new group chat`,
    });
    emitEvent(req, REFETCH_CHATS, members);
    res.status(201).json({ message: "Chat created successfully", chat: chat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create chat" });
  }
};

export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.userId }).populate(
      "members",
      "name avatar"
    );

    const transformedChats = chats.map((chat) => {
      const otherMember = getOtherMember(chat.members, req.userId);
      return {
        _id: chat._id,
        name: chat.name,
        groupChat: chat.groupChat,
        avatar: chat.groupChat
          ? chat.members.slice(0, 3).map((member) => member.avatar.url)
          : [otherMember.avatar.url],
        members: chat.members.filter(
          (member) => member._id.toString() !== req.userId.toString()
        ),
        name: chat.groupChat ? chat.name : otherMember.name,
      };
    });
    res.status(200).json({ chats: transformedChats });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

export const getMyGroups = async (req, res) => {
  try {
    const groupsChats = await Chat.find({
      members: req.userId,
      groupChat: true,
      creator: req.userId,
    }).populate("members", "name avatar");
    const groups = groupsChats.map((chat) => {
      return {
        _id: chat._id,
        name: chat.name,
        avatar: chat.members.slice(0, 3).map((member) => member.avatar.url),
        members: chat.members,
      };
    });

    res.status(200).json({ groups });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch groups" });
  }
};

export const addMembers = async (req, res) => {
  const { chatId, members } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (chat.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    if (members.length < 1) {
      return res
        .status(400)
        .json({ message: "Please add members to the group chat" });
    }

    if (!chat.groupChat) {
      return res.status(400).json({ message: "This is not a group chat" });
    }

    const allNewMembersPromise = members.map((member) =>
      Patient.findById(member, "name")
    );
    const allNewMembers = await Promise.all(allNewMembersPromise);
    const validNewMembers = allNewMembers.filter((member) => member !== null);

    if (validNewMembers.length === 0) {
      return res.status(400).json({ message: "No valid members to add" });
    }

    if (chat.members.length + validNewMembers.length > 200) {
      return res.status(400).json({ message: "Group members limit reached" });
    }
    const uniqueMembers = validNewMembers.filter(
      (member) => !chat.members.includes(member._id)
    );
    if (uniqueMembers.length === 0) {
      return res.status(400).json({ message: "Members already added" });
    }

    chat.members.push(...uniqueMembers.map((member) => member._id));
    await chat.save();

    const allUsersName = validNewMembers
      .map((member) => member.name)
      .join(", ");
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUsersName} added to the group chat`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);

    res.status(200).json({ message: "Members added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add members" });
  }
};

export const removeMembers = async (req, res, next) => {
  const { userId, chatId } = req.body;
  console.log(userId,chatId)
  try {
    const [chat, userThatWillBeRemoved] = await Promise.all([
      Chat.findById(chatId),
      Patient.findById(userId, "name"),
    ]);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.groupChat) {
      return res.status(400).json({ message: "This is not a group chat" });
    }
    if (chat.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    if (chat.members.length <= 3) {
      return next(
        res.status(400).json({ message: "Group must have at least 3 members" })
      );
    }

    const allChatMembers = chat.members.map((i) => i.toString());

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(req, ALERT, chat.members, {
      message: `${userThatWillBeRemoved.name} has been removed from the group`,
      chatId,
    });

    emitEvent(req, REFETCH_CHATS, allChatMembers);

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove member" });
  }
};

export const leaveGroup = async (req, res) => {
  const chatId = req.params.id;
  try {
    const chat = await Chat.findById(chatId);
    console.log(chat.creator);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.groupChat) {
      return res.status(400).json({ message: "This is not a group chat" });
    }

    if (chat.members.length <= 3) {
      return next(
        res.status(400).json({ message: "Group must have at least 3 members" })
      );
    }

    if (chat.creator.toString() === req.userId.toString()) {
      const randomMember = Math.floor(Math.random() * chat.members.length);
      chat.creator = chat.members[randomMember];
    }

    chat.members = chat.members.filter(
      (member) => member.toString() !== req.userId.toString()
    );
    await chat.save();

    const user = await Patient.findById(req.userId, "name");
    emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);
    emitEvent(req, REFETCH_CHATS, chat.members);
    res.status(200).json({ message: "You have left the group" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to leave the group" });
  }
};

export const sendAttachments = async (req, res) => {
  console.log('entered in sendAttachments');
  try {
    const { chatId } = req.body;
    const chat = await Chat.findById(chatId);
    const user = await Patient.findById(req.userId, "name");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.members.includes(req.userId)) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const files = req.files || [];
    if (files.length < 1) {
      return res.status(400).json({ message: "Please select a file" });
    }
    const attachments = await uploadFilesToCloudinary(files);
    const messageForRealTime = {
      content: "",
      attachments,
      sender: {
        _id: req.userId,
        name: user.name,
      },
      chat: chatId,
    };
    const messageForDb = {
      content: "",
      attachments,
      sender: req.userId,
      chat: chatId,
    };
    const message = await Message.create(messageForDb);
    emitEvent(req, NEW_MESSAGE, chat.members, {
      message: messageForRealTime,
      chatId,
    });
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
    return  res.status(200).json({
      success: true, 
      message});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send attachments" });
  }
};

export const getChatDetails = async (req, res) => {
  try {
    if (req.query.populate === "true") {
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));

      return res.status(200).json({
        success: true,
        chat,
      });
    } else {
      const chat = await Chat.findById(req.params.id);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      return res.status(200).json({
        success: true,
        chat,
      });
    }
  } catch (err) {
    console.error(err);
    if(err.name == 'CastError'){
      res.status(404).json({ message: "Chat not found" });
    }
    res.status(500).json({ message: "Failed to get chat details" });
  }
};

export const renameGroup = async (req, res) => {
  const { name } = req.body;
  const chatId = req.params.id;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (chat.creator.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to change the name" });
    }
    chat.name = name;
    await chat.save();
    emitEvent(req, ALERT, chat.members, {
      message: `${name} renamed the group chat`,
    });
    emitEvent(req, REFETCH_CHATS, chat.members);
    res.status(200).json({ message: "Group renamed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to rename group" });
  }
};

export const deleteChat = async (req, res) => {
  const chatId = req.params.id;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (chat.groupChat && chat.creator.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete the chat" });
    }
    if (!chat.groupChat && !chat.members.includes(req.userId.toString())) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete the chat" });
    }
    const messageWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });
    const public_ids = [];
    messageWithAttachments.forEach((message) => {
      message.attachments.forEach((attachment) => {
        public_ids.push(attachment.public_id);
      });
    });

    await Promise.all([
      deleteFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, chat.members);
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete chat" });
  }
};



export const getChatMessages = async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;

  const resultPerPage = 20;
  const skip = (page - 1) * resultPerPage;

  const chat = await Chat.findById(chatId);

  if (!chat) return res.status( 404).json("Chat not found");

  if (!chat.members.includes(req.userId.toString()))
    return res.status(403).json("You are not allowed to access this chat")

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resultPerPage)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
}
