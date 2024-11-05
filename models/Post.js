// backend/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content:   { type: String, required: true },
  image:     { type: String },
  likes:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
