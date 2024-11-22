const express = require('express');
const router = express.Router();
const { createPost, getPosts, deletePost,likePost,dislikePost,getPost } = require('../controllers/postController');
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');



router.post('/create',protect,upload.single('image'),createPost);
router.get('/', getPosts);
router.get('/:_id', getPost);
router.delete('/:id/delete',protect, deletePost);
router.post('/:_id/likes',protect,likePost);
router.post('/:_id/dislikes',protect,dislikePost);

module.exports = router;
