const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  commentCreator: {
    type: String,
    required: true,
    trim: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
})

const blogSchema = new Schema({
  postText: {
    type: String,
    required: [true, "Please enter a post"],
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  postCreator: {
    type: String,
    required: true,
    trim: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [commentSchema],
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
