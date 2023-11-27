const {generateToken, comparePasswords} = require('./auth.service')
const login = async (req, res, next) => {
	try {
		const {user, body: {password}} = req

		await comparePasswords(password, user.password)

		const accessToken = generateToken({userId: user.id})


		res.json({
			...accessToken,
			user
		})
	} catch (e) {
		next(e)
	}
}
module.exports = login