const UserModel = require('../model/user')
const { StatusCodes } = require('http-status-codes')
const  bcryptjs = require('bcryptjs')
const  generateToken = require('../util/token')
const jwt = require('jsonwebtoken')

// register
const register = async (req,res) => {
	try {
		const { name, email, mobile, password } = req.body

		let exEmail = await UserModel.findOne({email})
			if(exEmail)
				return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${email} already registered`})

		let exMobile = await UserModel.findOne({mobile})
			if(exMobile)
				return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${mobile} already registered`})

		let encPass = await bcryptjs.hash(password, 10)

		let newUser = await UserModel.create({
			name,
			email,
			mobile,
			password: encPass
		})

		// statements
		res.status(StatusCodes.CREATED).json({ status: true, msg: "user registered successfully", user: newUser })
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// login
const login  = async (req,res) => {
	try {

		const { email, password } = req.body 

		let exUser = await UserModel.findOne({email})
			if(!exUser)
				return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `${email} doesn't exists..`})

		// compare encryption password
		 let isMatch = await bcryptjs.compare(password, exUser.password)
		 	if(!isMatch)
		 		return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `password doesn't match`})

		 // generate token
		 	let loginToken = await generateToken({id: exUser._id })

		 res.cookie('accessToken', loginToken, {
		 	httpOnly: true,
		 	signed: true,
		 	path: `/api/auth/verify`,
		 	maxAge: 1 * 24 * 60 * 60 * 1000
		 })

		// statements
		res.status(StatusCodes.OK).json({ status: true, msg: "login successful", loginToken })
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// logout
const logout  = async (req,res) => {
	try {
		// statements
		res.clearCookie('loginToken', { path: `/api/auth/verify`})

		res.status(StatusCodes.OK).json({ status: true, msg: "logout successful"})
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// verify token
const verifyToken  = async (req,res) => {
	try {
		// statements
		const token = req.signedCookies.accessToken

			if(!token)
				return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `session expired.. or login again.. `})

			await jwt.verify(token, process.env.APP_SECRET_KEY,async (err,user) => {
				if(err)
					return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `invalid token.. invalid authorization token..`})

				let userInfo = await UserModel.findById({ _id: user.id }).select('-password')

				return res.status(StatusCodes.OK).json({ status: true, user: userInfo, msg: "user successfully verified.." })
			})
	
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

module.exports = { register, login, logout, verifyToken }