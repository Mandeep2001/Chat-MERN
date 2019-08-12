const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);
