const express = require('express');
const router = express.Router();
const { addComment ,getComments } = require('../controllers/commentController');
const {protect} = require('../middleware/authMiddleware');

router.post('/:postId', protect, addComment);
router.get('/',getComments);

module.exports = router;
