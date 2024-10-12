import express from 'express';
import { register, login,forgetPassword,resetPassword} from '../Controllers/authController.js';
import {upload} from '../Middleware/multer.js';
import { loginValidator, registerValidator, validateHandler } from '../lib/validators.js';

const router = express.Router();

router.post('/register',upload,registerValidator() ,validateHandler, register);
router.post('/login',loginValidator() ,validateHandler,login);
router.post('/forgetPassword',forgetPassword);
router.post('/resetPassword/:id/:token',resetPassword)  

export default router;