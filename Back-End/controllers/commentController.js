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

    const populatedComment = await Comment.findById(comment._id).populate('user', 'username photo');

    res.status(201).json({comment:populatedComment,message:"Comment added Successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.getComments = async (req, res) => {
//   try {
//     const postId = req.params.postId;  // Get the postId from the request parameters
//     // Find comments for the particular post and populate relevant fields
//     const comment = await Comment.find({ post: postId })
//     .populate('user', 'username photo')
//     .populate({ 
//         path: 'post', 
//         select: 'postId',
//         populate: { 
//             path: 'comments', 
//             select: 'content' 
//         }
//     })
//     .sort({ createdAt: -1 });

//     if (!comment) {
//         return res.status(404).json({ message: 'Comments not found for this post' });
//       }
//       res.json(comment);
//     } catch (error) {
//       return res.status(500).json({ message: 'Server error', err: error.message });
//   }
// }

exports.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;  // Get the postId from the request parameters
    // Find comments for the particular post and populate relevant fields
    const comments = await Comment.find({ post: postId })
      .populate('user', 'username photo') // Assuming 'photo' is a buffer field
      .populate({ 
        path: 'post', 
        select: 'postId',
        populate: { 
          path: 'comments', 
          select: 'content' 
        }
      })
      .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'Comments not found for this post' });
    }

    // Convert photo buffer to base64 string if it exists
    comments.forEach(comment => {
      if (comment.user && comment.user.photo) {
        comment.user.photo = comment.user.photo.toString('base64');
      }
    });

    res.json(comments); // Send the modified comments with base64 images
  } catch (error) {
    return res.status(500).json({ message: 'Server error', err: error.message });
  }
};
