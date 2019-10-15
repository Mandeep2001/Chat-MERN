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

/**
 * Questa funzioen controlla se esiste un utente con la key che corrisponde al value.
 *
 * @param {string} key dell'oggetto da cercare.
 * @param {string} value dell'oggeto da cercare.
 * @returns {null} Se non esiste.
 * @returns {object} Se esiste.
 */
const checkIfExists = async (key, value) => {
  const res = await User.findOne({ [key]: value });
  return res;
};

module.exports = {
  hashPassword,
  setUserOnline,
  setUserOffline,
  checkIfExists
};
