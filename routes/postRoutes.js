const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const {authMiddleware,generateToken} = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


router.post('/createPost',generateToken,authMiddleware,upload.single("image"), createPost);
router.get('/', getPosts);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
