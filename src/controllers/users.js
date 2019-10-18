const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users')
const config = require('../configs/configs')
let status = 200

module.exports = {
	register: (req, res) => {
		let username = req.body.username
		let password = req.body.password

		usersModel
			.checkUsername(username)
			.then(result => {
				if (result === undefined || result.length === 0) {
					bcrypt.genSalt(saltRounds, (err, salt) => {
						bcrypt.hash(password, salt, (err, hash) => {
							const data = {
								username,
								password: hash
							}

							usersModel
								.register(data)
								.then(result => {
									status = 200
									res.json({
										status,
										message: 'Register succesfull.',
										data
									})
								})
								.catch(err => {
									status = 400
									console.log(err)
									res.status(status).json({
										status,
										message: 'Register failed.'
									})
								})
						})
					})
				} else {
					status = 403
					res.status(status).json({
						status,
						message: 'Username already exist.'
					})
				}
			})
			.catch(err => {
				status = 500
				console.log(err)
				res.status(status).json({
					status,
					message: 'Error get username from database.'
				})
			})
	},

	login: (req, res) => {
		let username = req.body.username

		usersModel
			.login(username)
			.then(result => {
				const password = req.body.password
				const idUser = result[0].id
				const passwordHash = result[0].password
				const jwtPrivateKey = config.jwtPrivateKey

				if (bcrypt.compareSync(password, passwordHash)) {
					const token = jwt.sign({ idUser: idUser }, jwtPrivateKey, {
						expiresIn: '24h'
					})

					status = 200
					res.json({
						status,
						message: 'login success',
						data: {
							username,
							token
						}
					})
				} else {
					status = 401
					res.status(status).json({
						status,
						message: 'invalid password'
					})
				}
			})
			.catch(err => {
				status = 401
				// console.log(err)
				res.status(status).json({
					status,
					message: 'invalid username'
				})
			})
	},

	validateUser: (req, res, next) => {
		let authorization = req.headers['authorization'].split(' ')
		let bearerToken = authorization[1]
		jwt.verify(bearerToken, config.jwtPrivateKey, (err, decoded) => {
			if (err) {
				status = 401
				res.status(status).json({
					status,
					message: "Token not found. You're not logged in."
				})
			} else {
				next()
			}
		})
	}
}
