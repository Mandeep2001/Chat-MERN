const Joi = require("@hapi/joi");

// Register validation
const registerValidation = data => {
  const schema = {
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .email()
      .required(),
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    password: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .email()
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
