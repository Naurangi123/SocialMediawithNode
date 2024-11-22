const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const {protect} = require('../middleware/authMiddleware');

router.post('/:postId', protect, addComment);

module.exports = router;
