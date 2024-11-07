const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (user) => {
 
  const token = jwt.sign(
    { _id: user._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '2d' } 
  );

  return token;
};

// Middleware for authentication
const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token") || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded._id);  
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
    
  } catch (error) {
    console.error(error);  
    return res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = {
  generateToken,  // Uncomment this line if you want to use the generateToken function in your routes
  authMiddleware
};
