const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file; 
  if (!title || !content || !image) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const post = new Post({
      author: req.user._id,
      title: title,
      content: content,
      image: image.filename 
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username profilePic')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username profilePic' }
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
