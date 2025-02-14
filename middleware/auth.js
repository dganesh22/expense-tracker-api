
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        jwt.verify(token, process.env.APP_SECRET_KEY, (err, user) => {
            if (err)
                return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Token" });

            req.user = user;
            next()
        } )
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Invalid Authorization"})
        }
}

module.exports = authMiddleware