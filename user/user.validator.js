const Joi = require("joi");

const constants = require("../constants/regexp");


const defaultUserJoiSchema = Joi.object({
    first_name: Joi.string().alphanum().trim(),
    last_name: Joi.string().alphanum().min(2).max(50).trim(),
    phone: Joi.string(),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .lowercase(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP),
});

const newUserJoiSchema = defaultUserJoiSchema.keys({
    first_name: Joi.string().alphanum().trim().required(),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP)
        .required()
        .trim()
        .lowercase(),

})


module.exports = {
    newUserJoiSchema,
    defaultUserJoiSchema
}
// newUserJoiSchema