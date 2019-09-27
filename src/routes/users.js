const express = require('express')
const Route = express.Router()

const usersController = require('../controllers/users')

Route
  .post('/register', usersController.register)
  .post('/login', usersController.login)

module.exports = Route
