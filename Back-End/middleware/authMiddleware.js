const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    token = req.headers.authorization?.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied'
    });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    // console.log(currentUser);
    
    if (!currentUser) {
      return res.status(401).json({
        message: 'User no longer exists'
      });
    }
    if (currentUser.changePasswordAfter(decoded.iat)) {
      return res.status(401).json({
        message: 'User has changed password after jwt issued. Login again.'
      });
    }
    req.user = currentUser;
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Token verification failed. Please login again.'
    });
  }
};
