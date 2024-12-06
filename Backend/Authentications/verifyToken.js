import jwt from 'jsonwebtoken';
import Doctor from '../Models/DoctorSchema.js';
import Patient from '../Models/PaitentSchema.js';

export const authenticate = async (req, res, next) => {
     console.log('Authenticating User');
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        console.log('helo ggg')
        return res.status(401).json({success:false, message: 'Authorization Header is required' });
    }
    try {
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
        console.log('Decoded:', decoded);
        req.userId = decoded.id;
        req.role = decoded.role;
        next(); 
                
    } catch (error) {
        console.log(error);
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({success:false, message: 'Token Expired' });
        }
        return res.status(401).json({success:false, message: 'Not authorized to access this route' });
        
    }
};

export const adminOnly = async (req, res, next) => {
    console.log('Admin Authentication Middleware');
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: "Authorization Header is required" });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        
        const isMatched = decoded.secretKey === process.env.ADMIN_SECRET_KEY;
        if (!isMatched) {
            return res.status(403).json({ success: false, message: "Only Admin can access this route" });
        }
        

        next(); // Admin is authorized
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token Expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid or Unauthorized Token" });
    }
};

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;
    let user ;
    const patient = await Patient.findById(userId);
    const doctor = await Doctor.findById(userId);
    

    if(patient){
        user = patient;
    }
    else if(doctor){
        user = doctor;
    }
    console.log('User:', user);
    if(!roles.includes(user?.role)){
        return res.status(403).json({success:false, message: 'You are not authorized to access this route' });
    }
    next();
}       





