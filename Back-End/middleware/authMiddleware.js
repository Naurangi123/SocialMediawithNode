const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config()

exports.protect=async(req,res,next)=>{

  // Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if(!token){
    return res.status(401).json({ 
      message: 'No token, authorization denied' 
    });
  }
  // Verification token
  const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
  // console.log(decode);
  // check if user still exists
  const currentUser = await User.findById(decode.id)

  if(!currentUser){
    return res.status(401).json({
      message: 'User no longer exists'
    })
  }
  // check if user change password after the jwt issued
  if(currentUser.changePasswordAfter(decode.iat)){
    return res.status(401).json({
      message: 'User has changed password after jwt issued Login again'
    })
  }

  // Grant authorization to the user
  req.user=currentUser;

  next();
}