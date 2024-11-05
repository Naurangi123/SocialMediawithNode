// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/posts
router.post('/', createPost);

// @route   GET /api/posts
router.get('/', getPosts);

// @route   DELETE /api/posts/:id
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
