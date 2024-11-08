const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.registerUser = async (req, res) => {
  const { username, email, password, bio } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const profilePic = req.file; 

    if (!profilePic && !req.body.profilePic) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    user = new User({
      username,
      email,
      password,
      bio,
      profilePic: profilePic ? profilePic.filename : req.body.profilePic, 
    });

    await user.save();

    return res.status(201).json({ user});
  } catch (err) {
    console.log(err.message);
    
    return res.status(500).json({ message: 'Server error'});
  }
};
// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user){
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch){
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id },process.env.JWT_SECRET,{ expiresIn: '1h' });
  
    return res.json({message:"Authentication successful",token})
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not logged in' });
    }
    // console.log('User ID:', req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
