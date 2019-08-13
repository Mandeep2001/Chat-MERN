const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
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

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.TOKEN_SECRET
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    username: this.username,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", schema);
