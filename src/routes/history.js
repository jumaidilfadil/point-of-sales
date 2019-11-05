const express = require('express')
const route = express.Router()

// import controller
const historyController = require('../controllers/history')
const usersController = require('../controllers/users')

route.post(
	'/checkout',
	usersController.validateUser,
	historyController.checkout
)
route.get(
	'/history/income',
	usersController.validateUser,
	historyController.getIncome
)
route.get(
	'/history/recent-orders',
	usersController.validateUser,
	historyController.getRecentOrders
)
route.get(
	'/history/orders/:invoice',
	usersController.validateUser,
	historyController.getOrders
)

module.exports = route
