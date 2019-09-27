const express = require('express')
const Route = express.Router()
const cors = require('cors')

const app = express()

// import controller
const productsController = require('../controllers/products')
const usersController = require('../controllers/users')

Route
  .get('/product', cors(), productsController.getProducts)
  .post('/product', usersController.validateUser, productsController.addProduct)
  .put('/product/:id', usersController.validateUser, productsController.editProduct)
  .delete('/product/:id', usersController.validateUser, productsController.deleteProduct)
  .put('/product/stock/add/:id', usersController.validateUser, productsController.addStockProduct)
  .put('/product/stock/reduce/:id', usersController.validateUser, productsController.reduceStockProduct)

module.exports = Route
