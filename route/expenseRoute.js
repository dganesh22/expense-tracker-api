const expenseRoute = require('express').Router()
const { addTransaction, readAllTransactions, readSingleTransaction, updateTransaction, deleteTransaction } = require('../controller/expenseController')
const  auth = require('../middleware/auth')


expenseRoute.post(`/add`,auth, addTransaction)
expenseRoute.get(`/all`, auth, readAllTransactions)
expenseRoute.get(`/single/:id`, auth, readSingleTransaction)
expenseRoute.patch(`/update/:id`, auth, updateTransaction)
expenseRoute.delete(`/delete/:id`, auth, deleteTransaction)

module.exports = expenseRoute