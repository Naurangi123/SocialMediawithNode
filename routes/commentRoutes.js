// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const {authMiddleware,generateToken} = require('../middleware/authMiddleware');

router.post('/:postId', generateToken,authMiddleware, addComment);

module.exports = router;
