const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost,likePost,dislikePost,getPost } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');



router.post('/create',authenticate,upload.single('image'),createPost);
router.get('/', getPosts);
router.get('/:_id', getPost);
router.delete('/:id', deletePost);
router.post('/:_id/likes',authenticate,likePost);
router.post('/:_id/dislikes',authenticate,dislikePost);

module.exports = router;
