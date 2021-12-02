const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const blogPostSchema = new Schema({
  postText: {
    type: String,
    required: 'You need to enter a post.',
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

const BlogPost = model('Blog', blogPostSchema);

module.exports = BlogPost;
