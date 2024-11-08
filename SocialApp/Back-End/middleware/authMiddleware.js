const jwt = require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config()

const authenticate = async(req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  // const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("decoded from middleware",decoded,"Token",token);
      req.user =  decoded;  
    //   console.log("user from middleware",req.user);
      
      next(); 
  } catch (err) {
      return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;