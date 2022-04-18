const server = require('./index').server
const PORT = process.env.PORT || require('./index').PORT
const dateFormat = require('dateformat')
const Chats = require('./model/model.js')
const fs = require('fs')
const { Server } = require('socket.io')

const io = new Server(server)

dateFormat.masks.chatFormat = 'HH:MM'

io.on('connection', socket => {
    socket.on('new message', async data => {

        console.log(data)
        try {
            if (data.message === '') return

            const body = {
                message: data.message,
                username: data.username,
                date: dateFormat(data.date, 'chatFormat')
            }

            Chats.create(body)

            io.sockets.emit('new message', {
                message: data.message,
                username: data.username,
                date: dateFormat(data.date, 'chatFormat')
            })
        } catch (err) {
            console.log(err)
        }
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: data.username})
    })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})