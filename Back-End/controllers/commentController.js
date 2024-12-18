const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const { content } = req.body; 
  const { postId } = req.params; 

  try {
    const post = await Post.findById(postId);
    
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      user: req.user._id, 
      post: postId,
      content,
    });

    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    const populatedComment = await Comment.findById(comment._id).populate('user', 'username profilePic');

    res.status(201).json({comment:populatedComment,message:"Comment added Successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
