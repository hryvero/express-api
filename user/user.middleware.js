const {newUserJoiSchema, defaultUserJoiSchema}  = require('./user.validator')

const newUserValidator = (req, res, next) => {
    try {
        const {error, value} = newUserJoiSchema.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message, 400);
        }

        req.body = value;

        next();
    } catch (error) {
        next(error);
    }
};

const updateUserValidator = (req, res, next) => {
    try {
        const {error, value} = defaultUserJoiSchema.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message, 400);
        }

        req.body = value;

        next();
    } catch (error) {
        next(error);
    }
};
module.exports = {newUserValidator, updateUserValidator}