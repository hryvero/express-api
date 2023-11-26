const Joi = require("joi");

const constants = require("../constants/regexp");
const errorMessage = require('../constants/joi.errors')


const defaultUserJoiSchema = Joi.object({
  first_name: Joi.string().pattern(constants.ALPHABETIC_REGEXP).trim().min(2).max(20).messages(errorMessage.first_name),
  last_name: Joi.string().pattern(constants.ALPHABETIC_REGEXP).trim().min(2).max(20).messages(errorMessage.last_name),
  phone: Joi.string().min(4).max(11),
  email: Joi.string()
    .email()
    .trim()
    .lowercase(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).messages(errorMessage.password),
});

const newUserJoiSchema = defaultUserJoiSchema.keys({
  first_name: Joi.string().pattern(constants.ALPHABETIC_REGEXP).trim().required().messages(errorMessage.first_name),
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
})


module.exports = {
  newUserJoiSchema,
  defaultUserJoiSchema
}
