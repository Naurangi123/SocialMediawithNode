// backend/routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const { likePost, dislikePost } = require('../controllers/likeController');
const {generateToken,authMiddleware} = require('../middleware/authMiddleware');

router.post('/likes/:postId', generateToken,authMiddleware, likePost);
router.post('/dislikes/:postId', generateToken,authMiddleware, dislikePost);

module.exports = router;
