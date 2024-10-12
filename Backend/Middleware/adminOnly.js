import jwt from "jsonwebtoken";

export const adminOnly = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({success:false, message: 'Authorization Header is required' });
    }
    try{
        const token = authHeader.split(" ")[1];
    if (!token)
      return next(res.status(401).json("Only Admin can access this route", 401));
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
  
    const isMatched = decoded === adminSecretKey;
  
    if (!isMatched)
      return next(res.status(401).json("Only Admin can access this route", 401));
  
    next();
        
    }
    catch (error) {
        console.log(error);
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({success:false, message: 'Token Expired' });
        }
        return res.status(401).json({success:false, message: 'Not authorized to access this route' });
        
    }
    
  };
  