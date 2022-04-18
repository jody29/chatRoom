require('dotenv').config()
const express = require('express')
const http = require('http')
const PORT = process.env.PORT || 5500
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const url = process.env.DB_URL

const app = express()
const server = http.createServer(app)

module.exports = {
    server,
    PORT
}

mongoose.connect(url)
.then(() => console.log('connected to mongoDB'))
.catch(err => console.log(err))


const loginRoute = require('./routes/loginRoute')
const chatRoute = require('./routes/chatRoute')

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
.use('/', loginRoute)
.use('/', chatRoute)

require('./websocket.js')
