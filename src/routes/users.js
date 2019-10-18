const express = require('express')
const route = express.Router()

const usersController = require('../controllers/users')

route
	.post('/register', usersController.register)
	.post('/login', usersController.login)

module.exports = route
