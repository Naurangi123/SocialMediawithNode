const express = require('express');
const router = express.Router();
const { registerUser, loginUser,getUserProfile,logOut } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');



router.post('/register',upload.single('profilePic'), registerUser);
router.post('/login', loginUser);
router.get('/users',authenticate, getUserProfile);
router.post('/logout',logOut)

module.exports = router;
