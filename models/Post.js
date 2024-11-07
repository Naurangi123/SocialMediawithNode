// backend/models/Post.js
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
    type: String
  },
  likes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      type: Number,
      default: 0
      }
    ],
  dislikes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' ,
      type: Number,
      default: 0
      }
    ],
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
