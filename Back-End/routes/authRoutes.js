const express = require('express');
const router = express.Router();
const { signUp, login,userProfile} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware')
const upload = require('../middleware/upload');



router.post('/signUp',upload.single('photo'), signUp);
router.post('/login', login);

router.get('/user',protect, userProfile);

module.exports = router;
