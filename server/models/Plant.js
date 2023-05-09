const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const plantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  nickname: {
    type: String,
    trim: true, 
  },
  plantType: {
    type: String,
    required: true,
    trim: true
  },
  plantSize: {
    type: String,
    required: true,
    trim: true,
    enum: ["L", "M", "S"]
  },
  waterNeeded: {
    type: Number,
    required: true,
  },
  waterAdded: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
},
{
    timestamps: true
})

const Plant = model('Plant', plantSchema);

module.exports = Plant;