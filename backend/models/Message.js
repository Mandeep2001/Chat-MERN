const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    senderUserID: {
      type: String,
      required: true
    },
    receiverUserID: {
      type: String,
      required: true
    },
    isEliminated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", schema);
