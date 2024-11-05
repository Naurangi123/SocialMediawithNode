// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

router.post('/',upload.single('image'), createPost);
router.get('/', getPosts);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
