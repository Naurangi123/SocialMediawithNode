const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const user = await User.findById(req.user); 
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const image = req.file; 

  if (!image && !req.body.image) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  try {
    const post = new Post({
      user: req.user,  
      title: title,
      content: content,
      image: image ? image.filename : req.body.image 
    });

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
      .populate({
        path: 'comments',
        populate: { 
          path: 'user', 
          select: 'username profilePic' 
        }
      })
      .sort({ createdAt: -1 });

    return res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err: err.message });
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

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('Post user ID:', post.user.toString());
    console.log('Current user ID:', req.user._id.toString());

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Comment.deleteMany({ post: post._id });

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.likePost= async (req, res) => {
  const postId = req.params._id;
  const user = req.user; 

  try {
    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const isDislike = post.dislikes.includes(user._id);

    if (isDislike) {
      post.dislikes.pull(user._id);
      post.dislikeCount -= 1; 
      await post.save();
    }
    const isLike = post.likes.includes(user._id);

    if (!isLike) {
      post.likes.push(user._id);
      post.likeCount += 1;
    } else {
      post.likes.pull(user._id);
      post.likeCount -= 1; 
    }
    await post.save();

    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

};

exports.dislikePost= async (req, res) => {
  const postId = req.params._id;
  const user = req.user; 

  try {
    if (!user || !user._id) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const islike = post.likes.includes(user._id);

    if (islike) {
      post.likes.pull(user._id);
      post.likeCount -= 1; 
      await post.save();
    }
    const isDisLike = post.dislikes.includes(user._id);

    if (!isDisLike) {
      post.dislikes.push(user._id);
      post.dislikeCount += 1;
    } else {
      post.dislikes.pull(user._id);
      post.dislikeCount -= 1; 
    }
    await post.save();

    res.status(200).json({ message: 'Post disliked successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

};
