const express = require('express')
const app = express()
const server = require('http').Server(app)
const PORT = 5500
const session = require('express-session')
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
.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

require('./websocket.js')

const loginRoute = require('./routes/loginRoute')
const chatRoute = require('./routes/chatRoute')

app
.use('/', loginRoute)
.use('/', chatRoute)