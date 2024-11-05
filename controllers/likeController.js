const Post = require('../models/Post');

exports.likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Remove dislike if exists
    post.dislikes = post.dislikes.filter(userId => userId.toString() !== req.user._id.toString());

    // Toggle like
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(userId => userId.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.dislikePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Remove like if exists
    post.likes = post.likes.filter(userId => userId.toString() !== req.user._id.toString());

    // Toggle dislike
    if (post.dislikes.includes(req.user._id)) {
      post.dislikes = post.dislikes.filter(userId => userId.toString() !== req.user._id.toString());
    } else {
      post.dislikes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
