const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const uniqueValidator = require("mongoose-unique-validator");

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
    },
    profileImageURL: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.TOKEN_SECRET
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
    profileImageURL: this.profileImageURL,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", schema);
