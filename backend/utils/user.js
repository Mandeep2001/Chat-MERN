const bcrypt = require("bcrypt");
const User = require("../api/models/User");

const FINDONEANDUPDATE_CONFIG = { useFindAndModify: false, new: true };

const hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

const setUserOnline = _id => {
  return User.findOneAndUpdate(
    { _id },
    { isOnline: true },
    FINDONEANDUPDATE_CONFIG
  );
};

const setUserOffline = _id => {
  return User.findByIdAndUpdate(
    { _id },
    { isOnline: false, lastAccess: Date.now() },
    FINDONEANDUPDATE_CONFIG
  );
};

module.exports = {
  hashPassword,
  setUserOnline,
  setUserOffline
};
