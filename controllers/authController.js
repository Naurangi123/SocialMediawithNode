const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.registerUser = async (req, res) => {
  const { username, email, password, bio, profilePic } = req.body;

  try {
    let user = await User.findOne({ username});
    if (user){
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ username, email, password, bio, profilePic });
    await user.save();

    const payload = {user:{id:user._id}}
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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
    const payload = {user:{id:user._id}};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token})
    res.json({ user: { id: user._id, username: user.username, email, bio, profilePic } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
