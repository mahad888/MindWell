import express from "express";


import { adminLogin, AllChats, allMessages, AllPatients, getAdminData, getDashboardStats, getFeedback } from "../Controllers/adminController.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../Middleware/adminOnly.js";

const router = express.Router();
console.log("Admin Route")

router.post("/login", adminLoginValidator(), validateHandler, adminLogin);

// router.get("/logout", adminLogout);

//Only Admin Can Accecss these Routes

//router.use(adminOnly);

router.get("/patients", AllPatients);
router.get("/", getAdminData);
router.get("/chats", AllChats);
router.get("/messages", allMessages);
router.get("/stats",getDashboardStats);
router.get('/feedback',getFeedback)

export default router;