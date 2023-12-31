const loginSchema = require('./auth.validator')

function isLoginDataValid(req, res, next) {
	try {
		const {value, error} = loginSchema.validate(req.body)

		if (error) {
			throw new Error(error.message)
		}

		req.body = value

		next()
	} catch (e) {
		next(e)
	}
}

module.exports = isLoginDataValid
