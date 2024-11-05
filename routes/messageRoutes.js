// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/messages
router.post('/', authMiddleware, sendMessage);

// @route   GET /api/messages/:userId
router.get('/:userId', authMiddleware, getMessages);

module.exports = router;
