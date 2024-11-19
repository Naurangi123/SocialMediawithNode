// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// module.exports.User = async (req, res) => {
//     try {
//         const users = await User.find({})
//         const counts = await User.find({}).countDocuments(); 

//         return res.status(200).json({
//             msg: "All users are here",
//             counts: counts,
//             data: users 
//         });
//     } catch (error) {
      
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// };

// module.exports.signUp = async (req, res) => {
//     try {
//         const { name, phone, email, password } = req.body;

//         const userInfo = await User.findOne({ email: email });

//         if (userInfo) {
//             return res.status(400).json({
//                 msg: "Email already registered."
//             });
//         }


//         const hashPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name: name,
//             phone: phone,
//             email: email,
//             password: hashPassword
//         });

      
//         const { password: _, ...userData } = user.toObject();

//         return res.status(201).json({
//             msg: "Account created successfully",
//             data: userData 
//         });

//     } catch (error) {
        
//         return res.status(500).json({
//             msg: "Internal server error, please try again"
//         });
//     }
// };

// module.exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ msg: "All fields are required" });
//     }
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ msg: "Incorrect password" });
//         }

//         const { password: _, ...userData } = user.toObject();

//         return res.status(200).json({ 
//             msg: "Login successful", 
//             user: userData 
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Something went wrong. Try again" });
//     }
// };
