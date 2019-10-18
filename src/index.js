const express = require('express')
const route = express.Router()

// import routes
const products = require('./routes/products')
const category = require('./routes/category')
const users = require('./routes/users')
const history = require('./routes/history')

route
	.use('/api/v1', products)
	.use('/api/v1', category)
	.use('/user/', users)
	.use('/', history)

module.exports = route
