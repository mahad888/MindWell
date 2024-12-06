import express from "express";


import { adminLogin, AllChats, AllDoctors, allMessages, AllPatients, approveDoctor, getAdminData, getDashboardStats, getFeedback, getPendingDoctors, uploadVideo } from "../Controllers/adminController.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../Middleware/adminOnly.js";
import { upload, video } from "../Middleware/multer.js";

const router = express.Router();
console.log("Admin Route")


// router.get("/logout", adminLogout);

//Only Admin Can Accecss these Routes

//router.use(adminOnly);

router.get('/admin/dashboard',getDashboardStats)
router.get("/admin/patients", AllPatients);
router.get("/admin/doctors", AllDoctors);
router.post("/admin/auth/login", adminLogin);

router.get("/", getAdminData);
router.get("/admin/chats", AllChats);
router.get("/admin/messages", allMessages);
router.get("/stats",getDashboardStats);
router.get('/feedback',getFeedback)
router.get('/pendingDoctors',getPendingDoctors)
router.put('/approveDoctor/:doctorId',approveDoctor)
router.post('/admin/videos',video,uploadVideo)

export default router;