const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const formatUserResponse = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  bio: user.bio,
  profilePic: user.profilePic,
});

exports.registerUser = async (req, res) => {
  const { username, email, password, bio, profilePic } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, email, password, bio, profilePic });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, user: formatUserResponse(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token, user: formatUserResponse(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
