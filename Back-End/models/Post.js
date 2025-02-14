
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:{
    type:String,
    default: '',
    required: true
  },
  content:{ 
    type: String, 
    required: true
  },
  // image:{
  //   type: String,
  //   required: false
  // },
  image: {
    filename: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    contentType: { type: String, required: true },
  },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comments:[{type: mongoose.Schema.Types.ObjectId,ref: 'Comment'}],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
