
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:{
    type:String,
    required: true
  },
  content:{ 
    type: String, 
    required: true
  },
  image:{
    type: String,
    required: false
  },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default:[]}],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default:[]}],
  comments:[{type: mongoose.Schema.Types.ObjectId,ref: 'Comment'}],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);