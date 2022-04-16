const express = require('express')
const app = express()
const server = require('http').Server(app)
const PORT = 5500
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

module.exports = {
    server,
    PORT
}

app
.set('view engine', 'ejs')
.set('views', path.join(__dirname, 'views'))
.use(express.static(__dirname + '/public'))
.use(bodyParser.urlencoded({ extended: true }))

require('./websocket.js')

const loginRoute = require('./routes/loginRoute')

app.use('/', loginRoute)