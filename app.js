// import with ES5
const express = require('express')
const bodyParser = require('body-parser')
const routerNav = require('./src/index')
const logger = require('morgan')
const config = require('./src/configs/configs')
const fileUpload = require('express-fileupload')

// use express
const app = express()

app.use(express.static('./'))

app.use(fileUpload({
  createParentPath: true
}));

// use body parser from json
app.use(bodyParser.json())
// use body parser from url-encoded
app.use(bodyParser.urlencoded({extended: true}))

// define PORT
const port = config.serverPort

// start server with ES5 function
app.listen(port, function() {
  console.log('Server has running on port: ' + port)
})

app.use('/', routerNav)

// add 404 not found
app.get('*', (req, res) => {
  res.send('Sorry, 404 not found')
})

// log
app.use(logger('dev'))
