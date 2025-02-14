const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	 title: {
	 	type: String,
	 	required: true,
	 	trim: true
	 },
	 amount: {
	 	type: Number,
	 	required: true,
	 	default: 0
	 }
},{
	collection: "transactions",
	timeStamp: true
})

module.exports = mongoose.model("Expense", expenseSchema)