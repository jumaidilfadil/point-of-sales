const express = require('express')
const route = express.Router()
const cors = require('cors')

// import controller
const categoryController = require('../controllers/category')
const usersController = require('../controllers/users')

route
	.get('/category', cors(), categoryController.getCategory)
	.post(
		'/category',
		usersController.validateUser,
		categoryController.addCategory
	)
	.put(
		'/category/:id',
		usersController.validateUser,
		categoryController.editCategory
	)
	.delete(
		'/category/:id',
		usersController.validateUser,
		categoryController.deleteCategory
	)

module.exports = route
