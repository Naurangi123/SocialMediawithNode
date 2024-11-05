const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      author: req.user._id,
      post: postId,
      content,
    });

    await comment.save();
    post.comments.push(comment._id);
    await post.save();

    const populatedComment = await Comment.findById(comment._id).populate('author', 'username profilePic');

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
