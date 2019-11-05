// import model
const historyModel = require('../models/history')
let status = 200

module.exports = {
	checkout: (req, res) => {
		const { invoice, username, date, product_name, price, quantity } = req.body
		for (var i = 0; i < product_name.length; i++) {
			var data = {
				invoice,
				username,
				date,
				product_name: product_name[i],
				price: price[i],
				quantity: quantity[i]
			}
			historyModel
				.addHistory(data)
				.then(result => {
					status = 200
					res.json({
						status,
						message: 'success adding history',
						data
					})
				})
				.catch(err => {
					status = 500
					console.log(err)
					res.status(status).json({
						status,
						message: 'error adding history'
					})
				})
		}
	},
	getIncome: (req, res) => {
		historyModel
			.getIncome()
			.then(result => {
				status = 200
				res.json({
					status: 200,
					message: "Success getting today's income.",
					data: result
				})
			})
			.catch(err => {
				status = 500
				console.log(err)
				res.status(status).json({
					status,
					message: "Error getting today's income"
				})
			})
	},
	getRecentOrders: (req, res) => {
		historyModel
			.getRecentOrders()
			.then(result => {
				status = 200
				res.json({
					status: 200,
					message: 'Success getting recent orders.',
					data: result
				})
			})
			.catch(err => {
				status = 500
				console.log(err)
				res.status(status).json({
					status,
					message: 'Error getting recent orders.'
				})
			})
	},
	getOrders: (req, res) => {
		const invoice = req.params
		const data = invoice

		historyModel
			.getOrders(data)
			.then(result => {
				status = 200
				res.json({
					status: 200,
					message: 'Success getting all orders by invoice.',
					data: result
				})
			})
			.catch(err => {
				status = 500
				console.log(err)
				res.status(status).json({
					status,
					message: 'Error getting orders by invoice.'
				})
			})
	}
}
