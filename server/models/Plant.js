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
  }
},
{
    timestamps: true
})

// Method to reset waterNeeded to 0 at the start of each month
plantSchema.statics.resetWaterNeeded = async function () {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Find all plants created in the current month and year
  const plants = await this.find({
    createdAt: {
      $gte: new Date(`${currentYear}-${currentMonth}-01`),
      $lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
    },
  });

  // Reset waterNeeded to 0 for each plant
  for (const plant of plants) {
    plant.waterNeeded = 0;
    await plant.save();
  }
};

const Plant = model('Plant', plantSchema);

module.exports = Plant;