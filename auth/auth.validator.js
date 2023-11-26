const Joi = require("joi");

const constants = require("../constants/regexp");
const errorMessage = require("../constants/joi.errors");


const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .lowercase(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).messages(errorMessage.password),
});

module.exports = loginSchema