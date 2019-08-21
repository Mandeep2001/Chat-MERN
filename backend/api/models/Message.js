const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", schema);
