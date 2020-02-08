const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timerModel = new Schema({
  category: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  start: {
    type: Number,
    required: true
  },
  finish: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("Timer", timerModel);
