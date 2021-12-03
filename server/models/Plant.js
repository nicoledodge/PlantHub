const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const plantSchema = new Schema({
  name: {
    type: String,
    trim: true,
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