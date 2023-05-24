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
    default: function(){
      return this.name
    }
  },
  plantType: {
    type: String,
    required: true,
    trim: true,
    enum: {values: ["Outdoor", "Indoor"],
    message: "You must enter a valid plant type!"}
  },
  plantSize: {
    type: String,
    required: true,
    trim: true,
    enum: {values: ["L", "M", "S"],
  message: "You must enter a valid plant size!"}
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
  },
  image: String
},
{
    timestamps: true
})

const Plant = model('Plant', plantSchema);

module.exports = Plant;
