const { promisify }=require('util')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const signToken=(id)=>{
  return jwt.sign({ id }, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRES 
  });
}



exports.signUp = async (req, res) => {
  const { username, email, password, confirmPassword, bio} = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const photo = req.file; 

    if (!photo && !req.body.photo) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const user = new User({
      username,
      email,
      password,
      confirmPassword,
      bio,
      photo: photo ? photo.filename : req.body.photo,
    });

    await user.save();

    return res.status(201).json({
      status: 'Success',
      data: {
        user: user
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    const user = await User.findOne({ username:username});

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = signToken(user._id);
    // console.log(token);
    req.session.token = token;

    return res.json({
      status: 'Success',
      user:user.username,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// exports.protect=async(req,res,next)=>{

//   // Getting token and check of it's there
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if(!token){
//     return res.status(401).json({ 
//       message: 'No token, authorization denied' 
//     });
//   }
//   // Verification token
//   const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
//   // console.log(decode);
  
//   // check if user still exists
//   const currentUser = await User.findById(decode.id)

//   if(!currentUser){
//     return res.status(401).json({
//       message: 'User no longer exists'
//     })
//   }
//   // checknnif user change password after the jwt issued
//   if(currentUser.changePasswordAfter(decode.iat)){
//     return res.status(401).json({
//       message: 'User has changed password after jwt issued Login again'
//     })
//   }

//   // Grant authorization to the user
//   req.user=currentUser;

//   next();
// }
exports.userProfile=async(req,res)=>{
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
