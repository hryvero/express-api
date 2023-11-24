
function isLoginDataValid(req, res, next) {
    try {
        const { value, error } = authValidator.loginSchema.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        req.body = value;

        next();
    } catch (e) {
        next(e);
    }
}
function validatePassword(req, res, next) {
    try {
        const { error } = passwordValidator.PasswordSchema.validate(req.body);

        if (error) {
            next(new ApiError(error.details[0].message, statusCode.badRequestStatus));
            return;
        }

        next();
    } catch (e) {
        next(e);
    }
}
function validateEmail(req, res, next) {
    try {
        const { error } = emailValidator.EmailSchema.validate(req.body);

        if (error) {
            next(new ApiError(error.details[0].message, statusCode.badRequestStatus));
            return;
        }

        next();
    } catch (e) {
        next(e);
    }
}
module.exports={
    validatePassword,
    validateEmail,
    isLoginDataValid
}