const express = require('express')
const route = express.Router()

const app = express()

// import controller
const productsController = require('../controllers/products')
const usersController = require('../controllers/users')

route
	.get('/product', productsController.getProducts)
	/*
	.get(
		'/product',
		productsController.getProductsCache,
		productsController.getProducts
	)
	*/
	.post('/product', usersController.validateUser, productsController.addProduct)
	.put(
		'/product/:id',
		usersController.validateUser,
		productsController.editProduct
	)
	.delete(
		'/product/:id',
		usersController.validateUser,
		productsController.deleteProduct
	)
	.patch(
		'/product/stock/add/:id',
		usersController.validateUser,
		productsController.addStockProduct
	)
	.patch(
		'/product/stock/reduce/:id',
		usersController.validateUser,
		productsController.reduceStockProduct
	)

module.exports = route
