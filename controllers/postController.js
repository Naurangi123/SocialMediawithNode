const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file;

  if (!title || !content || !image) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const user = await User.findById(req.user._id); 
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

  console.log("Authenticated user from Controller:", req.user._id); 

  try {
    const post = new Post({
      user: req.user._id,  
      title,
      content,
      image: image ? image.filename : null,
    });

    await post.save();
    res.status(201).json(post);
    console.log("post", post);
    (post)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username profilePic')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username profilePic' }
      })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Comment.deleteMany({ post: post._id });
    await post.remove();

    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
