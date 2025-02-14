const ExpenseModel = require('../model/expense')
const { StatusCodes } =require('http-status-codes')

// add
const addTransaction = async (req,res) => {
	try {
		// statements
		let user = req.user.id 

		let { title, amount } = req.body 

				await ExpenseModel.create({
					userId: user,
					title,
					amount
				})


		res.json({ msg: "transaction added successfully" })
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// read all
const readAllTransactions = async (req,res) => {
	try {
		// statements
		let user = req.user.id 

		let transactions = await ExpenseModel.find({})

		let filterTrans = transactions.filter(item => item.userId == user)

		res.json({ length: filterTrans.length, transactions: filterTrans })
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// read single 
const readSingleTransaction = async (req,res) => {
	try {
		// statements
		let transId = req.params.id 

			let exTrans = await ExpenseModel.findById({_id: transId})
				if(!exTrans)
					return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `requested transaction not found`})


		res.status(StatusCodes.OK).json({ transaction: exTrans })
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// update
const updateTransaction = async (req,res) => {
	try {
		// statements
		let transId = req.params.id 

			let exTrans = await ExpenseModel.findById({_id: transId})
				if(!exTrans)
					return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `requested transaction not found`})

			await ExpenseModel.findByIdAndUpdate({_id: transId}, req.body)

		res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "transaction updated successfully"})
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

// delete
const deleteTransaction = async (req,res) => {
	try {
		// statements
		let transId = req.params.id 

			let exTrans = await ExpenseModel.findById({_id: transId})
				if(!exTrans)
					return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `requested transaction not found`})

				await ExpenseModel.findByIdAndDelete({_id: transId })
				
		res.status(StatusCodes.OK).json({ status: true, msg: "transaction deleted successfully"})
	} catch(e) {
		// statements
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: e.message });
	}
}

module.exports = { addTransaction, readAllTransactions, readSingleTransaction, updateTransaction, deleteTransaction }