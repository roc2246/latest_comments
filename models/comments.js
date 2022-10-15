const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  user: {
    image: {
      png: {
        type: String,
        required: true,
      },
      webp: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: true,
    },
  },
  // Replies
  replies: {
    type: Array,
    required: false,
  }
  
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
