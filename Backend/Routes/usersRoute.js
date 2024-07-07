import express from 'express';

import { updatePatient,deletePatient,getPatient,getAllPatients } from "../Controllers/PatientController.js";
import { updateDoctor,deleteDoctor,getDoctor,getAllDoctors } from "../Controllers/DoctorController.js";
import { authenticate, restrict } from '../Authentications/verifyToken.js';


const router = express.Router();

router.get('/getPatient/:id',authenticate,restrict(['patient']), getPatient);
router.get('/getAllPatients',authenticate,restrict(['admin']), getAllPatients);
router.put('/updatePatient/:id',authenticate,restrict(['patient']), updatePatient);
router.delete('/deletePatient/:id',authenticate,restrict(['patient']), deletePatient);

router.get('/getDoctor/:id',authenticate,restrict(['doctor']), getDoctor);
router.get('/getAllDoctors',authenticate,restrict(['doctor']), getAllDoctors);
router.put('/updateDoctor/:id',authenticate,restrict(['doctor']), updateDoctor);
router.delete('/deleteDoctor/:id',authenticate,restrict(['doctor']), deleteDoctor);


export default router;