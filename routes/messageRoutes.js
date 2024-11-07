// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const {generateToken,authMiddleware} = require('../middleware/authMiddleware');


router.post('/', generateToken,authMiddleware, sendMessage);
router.get('/:userId', generateToken,authMiddleware, getMessages);

module.exports = router;
