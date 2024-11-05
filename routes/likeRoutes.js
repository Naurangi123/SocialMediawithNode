// backend/routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const { likePost, dislikePost } = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/likes/:postId
router.post('/likes/:postId', authMiddleware, likePost);

// @route   POST /api/dislikes/:postId
router.post('/dislikes/:postId', authMiddleware, dislikePost);

module.exports = router;
