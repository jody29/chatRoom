const server = require('./index').server
const PORT = require('./index').PORT
const io = require('socket.io')(server)

server.listen(process.env.PORT || PORT)