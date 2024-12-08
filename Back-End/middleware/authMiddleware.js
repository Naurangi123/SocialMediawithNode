const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  // Check if the session contains a JWT token
  let token = req.session.token;

  // If no token, deny access
  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied'
    });
  }

  try {
    // Verify the JWT token using promisify and secret from environment variables
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if the user still exists
    const currentUser = await User.findById(decoded.id);
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
