const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const authenticate = require('../middleware/authMiddleware');

router.post('/:postId', authenticate, addComment);

module.exports = router;
