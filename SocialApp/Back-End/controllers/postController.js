const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const user = await User.findById(req.user._id); 

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  
  const image = req.file; 

  if (!image && !req.body.image) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    const post = new Post({
      user: req.user._id,  
      title: title,
      content: content,
      image: image ? image.filename : req.body.image 
    });
    console.log("Post object:", post);

    await post.save();
    return res.status(201).json({ post, message: 'Post saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', err: err.message });
  }
};



exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('user', 'username profilePic bio')
      .populate({path: 'comments',populate: { path: 'user', select: 'username profilePic' }})
      .sort({ createdAt: -1 });

    return res.json({posts});
  } catch (err) {
    res.status(500).json({ message: 'Server error',err: err.message});
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
     .populate('user', 'username profilePic bio')
     .populate({path: 'comments', populate: { path: 'user', select: 'username profilePic' }})
     
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', err: error.message });
    
  }
}

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

exports.likePost = async (req, res) => {
  try {
    const postId = req.params._id;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    const validUserId = new mongoose.Types.ObjectId(userId);
    
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!Array.isArray(post.likes)) post.likes = [];
    if (!Array.isArray(post.dislikes)) post.dislikes = [];

    post.dislikes = post.dislikes.filter((id) => id && id.toString() !== validUserId.toString());

    if (post.likes.includes(validUserId)) {
      post.likes = post.likes.filter((id) => id && id.toString() !== validUserId.toString());
      post.likeCount -= 1;  
    } else {
      post.likes.push(validUserId);
      post.likeCount += 1; 
    }
    await post.save();
    res.json({post});
  } catch (err) {
    res.status(500).json({ message: 'Server error' ,err: err.message });
  }
};

exports.dislikePost = async (req, res) => {

  try {
    const postId = req.params._id;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    const validUserId = new mongoose.Types.ObjectId(userId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!Array.isArray(post.likes)) post.likes = [];
    if (!Array.isArray(post.dislikes)) post.dislikes = [];

    post.likes = post.likes.filter((id) => id && id.toString() !== validUserId.toString());
    if (post.dislikes.includes(validUserId)) {

      post.dislikes = post.dislikes.filter((id) => id && id.toString() !== validUserId.toString());
      post.dislikeCount -= 1;  
    } else {
      post.dislikes.push(validUserId);
      post.dislikeCount += 1; 
    }

    await post.save();
    res.json({post});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
