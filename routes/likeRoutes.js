// backend/routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const { likePost, dislikePost } = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/likes/:postId', authMiddleware, likePost);
router.post('/dislikes/:postId', authMiddleware, dislikePost);

module.exports = router;
