const jwt = require('jsonwebtoken')

const generateToken = async (user) => {
	return await jwt.sign(user, process.env.APP_SECRET_KEY, { expiresIn: '1d'})
}

module.exports = generateToken