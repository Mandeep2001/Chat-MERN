const emailValidator = require("email-validator");

/**
 * Questa funzione valida un indirizzo e-mail.
 *
 * @param {string} email da validare.
 * @returns {null} Se non ci sono errori.
 * @returns {string} Se si sono verificati degli errori.
 */
const validateEmail = email => {
  // return emailValidator.validate(email);
  if (!email) return "Devi inserire un indirizzo e-mail.";
  if (!emailValidator.validate(email))
    return "L'indirizzo e-mail inserito non è valido.";
  return null;
};

/**
 * Questa funzioen valida il nome utente.
 *
 * @param {String} username da validare.
 * @returns {null} Se non ci sono errori.
 * @returns {string} Se si sono verificati degli errori.
 */
const validateUsername = username => {
  if (!username) return "Devi inserire un nome utente.";
  if (username.length < 3)
    return "Il nome utente deve contenere almeno 3 caratteri.";
  return null;
};

/**
 * Questa funzioen valida la password.
 *
 * @param {string} password da validare.
 * @returns {null} Se non ci sono errori.
 * @returns {string} Se si sono verificati degli errori.
 */
const validatePassword = password => {
  if (!password) return "Devi inserire una password.";
  if (password.length < 8)
    return "La password deve contenere almeno 8 caratteri.";
  return null;
};

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword
};
