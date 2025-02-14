const authRoute = require('express').Router()
const { register, login, logout, verifyToken } = require('../controller/authController')

authRoute.post(`/register`, register)
authRoute.post(`/login`, login)
authRoute.get(`/logout`, logout)
authRoute.get(`/verify`, verifyToken)

module.exports = authRoute