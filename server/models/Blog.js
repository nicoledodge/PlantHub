const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const blogSchema = new Schema({
  postText: {
    type: String,
    required: 'Please enter a post.',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postCreator: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
