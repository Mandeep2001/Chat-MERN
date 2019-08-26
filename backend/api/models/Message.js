const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  senderUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isEliminated: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", schema);
