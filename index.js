const express  = require('express')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { StatusCodes } = require('http-status-codes')
const PORT = process.env.PORT
const connectDB = require('./config/dbConfig')

const app = express()

app.use(express.urlencoded({extended: true }))
app.use(express.json())

app.use(cors())
app.use(cookieParser(process.env.APP_SECRET_KEY))

// index path
app.get(`/`, async (req,res) => {
	try {
		// statements
		return res.status(StatusCodes.OK).json({ status: true, msg: "Welcome to Expense tracker API"})
	} catch(e) {
		// statements
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
})

// api path
app.use(`/api/auth`, require('./route/authRoute'))
app.use(`/api/transaction`, require('./route/expenseRoute'))


// default path
app.all(`/*`, async (req,res) => {
	try {
		// statements
		return res.status(StatusCodes.NOT_FOUND).json({ status: true, msg: "Requested Path Not Found"})
	} catch(e) {
		// statements
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
})

app.listen(PORT,() => {
	connectDB()
	console.log(`server is started and running @ http://localhost:${PORT}`)
})