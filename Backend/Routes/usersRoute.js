import express from 'express';

import { updatePatient,deletePatient,getPatient,getAllPatients, searchPatient, sendFriendRequest, acceptFriendRequest, getMyNotifications, getAllFriends, getUserFriends, addRemoveFriend, getMyAppointments } from "../Controllers/PatientController.js";
import { updateDoctor,deleteDoctor,getDoctor,getAllDoctors, sendApprovalRequest, getDoctorAppointments } from "../Controllers/DoctorController.js";
import { authenticate, restrict } from '../Authentications/verifyToken.js';
import { acceptRequestValidator, sendRequestValidator, validateHandler } from '../lib/validators.js';
import { upload } from '../Middleware/multer.js';


const router = express.Router();
router.use(authenticate)
router.get('/get/myprofile',restrict(['patient']), getPatient);
router.get('/getAllPatients',restrict(['admin']), getAllPatients);
router.put('/updatePatient',upload,restrict(['patient']), updatePatient);
router.delete('/deletePatient/:id',restrict(['patient']), deletePatient);
router.get('/searchPatient',restrict(['patient']), searchPatient);
router.put('/send/request',sendRequestValidator(),validateHandler,restrict(['patient']), sendFriendRequest);
router.put('/accept/request',acceptRequestValidator(),validateHandler,restrict(['patient']), acceptFriendRequest);
router.get('/get/notifications', restrict(['patient']), getMyNotifications);
router.get('/get/friends', restrict(['patient']), getAllFriends);
router.get("/:id/friends", restrict(["patient"]), getUserFriends);
router.patch("/:id/:friendId",restrict(["patient"]), addRemoveFriend);
router.get('/getAllDoctors',restrict(['patient']), getAllDoctors);
router.get('/appointments',restrict(['patient']), getMyAppointments);


router.get('/getDoctor/:id', getDoctor);
router.put('/updateDoctor',upload,restrict(['doctor']),updateDoctor);
router.delete('/deleteDoctor/:id',restrict(['doctor']), deleteDoctor);
router.put('/send/approval/request',restrict(['doctor']), sendApprovalRequest);
router.get('/doctor/appointments',restrict(['doctor']), getDoctorAppointments);

export default router;