const mongoose = require('mongoose')


const connectDB = async () => {
	if(process.env.MODE === "development") {
		return await mongoose.connect(process.env.DEV_MONGO).then(res => {
			console.log('connected to development db')
		}).catch(err => console.log(err.message))

	} else if (process.env.MODE === "production") {
		return await mongoose.connect(process.env.PROD_MONGO).then(res => {
			console.log('connected to production db')
		}).catch(err => console.log(err.message))
	} else {
		console.log('Invalid mode.. error connecting to database')
	}
}

module.exports = connectDB