const express = require('express')
const Route = express.Router()

// import routes
const products = require('./routes/products')
const category = require('./routes/category')
const users = require('./routes/users')

Route
  .use('/api/v1', products)
  .use('/api/v1', category)
  .use('/user/', users)

module.exports = Route
