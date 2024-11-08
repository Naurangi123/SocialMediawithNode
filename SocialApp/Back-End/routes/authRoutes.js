const express = require('express');
const router = express.Router();
const { registerUser, loginUser,getUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');



router.post('/register',upload.single('profilePic'), registerUser);
router.post('/login', loginUser);
router.get('/users',authenticate, getUserProfile);

module.exports = router;
