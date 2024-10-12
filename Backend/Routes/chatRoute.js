import express from "express";
import { authenticate } from "../Authentications/verifyToken.js";
import {
  newGroupChat,
  getMyChats,
  leaveGroup,
  getMyGroups,
  addMembers,
  removeMembers,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getChatMessages,
} from "../Controllers/chatController.js";
import { attachments } from "../Middleware/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  //sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.use(authenticate);

router.post("/chat", newGroupValidator(), validateHandler, newGroupChat);
router.get("/my/chats", getMyChats);
router.get("/my/groupchats", getMyGroups);
router.put("/add/members", addMemberValidator(), validateHandler, addMembers);
router.put(
  "/remove/members",
  removeMemberValidator(),
  validateHandler,
  removeMembers
);
router.delete("/leave/group/:id", chatIdValidator(), validateHandler, leaveGroup);
router.post(
 "/message/attachment",
  // sendAttachmentsValidator(),
  // validateHandler,
  attachments,
  sendAttachments
);
router.get("/messages/:id", chatIdValidator(), validateHandler, getChatMessages);
router
  .route("/chat/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(),validateHandler,deleteChat);

export default router;
