// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:postId', authMiddleware, addComment);

module.exports = router;
