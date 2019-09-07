const Joi = require("@hapi/joi");

// Register validation
const registerValidation = data => {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .required()
      .error(errors => {
        return {
          message: "La password deve contenere almeno 8 caratteri."
        };
      }),
    email: Joi.string()
      .email()
      .required()
      .error(errors => {
        return { message: "Inserisci un indirizzo e-mail valido." };
      }),
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    password: Joi.string()
      .min(8)
      .required()
      .error(errors => {
        return {
          message: "La password deve contenere almeno 8 caratteri."
        };
      }),
    email: Joi.string()
      .email()
      .error(errors => {
        return { message: "Inserisci un indirizzo e-mail valido." };
      }),
      username: Joi.string()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
