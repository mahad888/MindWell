import express from 'express';
import { register, login,forgetPassword,resetPassword} from '../Controllers/authController.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

router.post('/register',upload.single('photo'), register);
router.post('/login', login);
router.post('/forgetPassword',forgetPassword);
router.post('/resetPassword/:id/:token',resetPassword);

export default router;