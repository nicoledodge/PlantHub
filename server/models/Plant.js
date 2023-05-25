const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const plantSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    nickname: {
      type: String,
      trim: true,
      default: function () {
        return this.name;
      },
    },
    plantType: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["Outdoor", "Indoor"],
        message: "You must enter a valid plant type!",
      },
    },
    plantSize: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["L", "M", "S"],
        message: "You must enter a valid plant size!",
      },
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
    image: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);
plantSchema.virtual("percentage").get(function () {
  return ((this.waterAdded / this.waterNeeded) * 100).toFixed();
});

plantSchema.virtual("status").get(function () {
  //get number of days in this month
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDayOfMonth = currentDate.getDate();
  let numberOfDaysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();
  let ontargetGoal = (currentDayOfMonth / numberOfDaysInMonth) * 100;
  if (
    this.percentage > ontargetGoal &&
    this.percentage === 100
  ) {
    return ("Your plant is all watered up for the month! :D");
  }
  //determine if on target
  if (this.percentage >= ontargetGoal) {
    return("Your plant is hydrated!");
  }
  return `I'm thirsty!`
});

plantSchema.pre("save", function(next){
  // Calculate the waterAdded value based on the current day of the month
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const numberOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  this.waterAdded = Math.floor(this.waterNeeded * (currentDayOfMonth / numberOfDaysInMonth));
  // Call the next middleware
  next();
})

const Plant = model("Plant", plantSchema);

module.exports = Plant;
