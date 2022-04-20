const server = require('./index').server
const PORT = process.env.PORT || require('./index').PORT
const dateFormat = require('dateformat')
const Users = require('./model/model.js')
const { Server } = require('socket.io')

const io = new Server(server)

dateFormat.masks.chatFormat = 'HH:MM'

let onlineUsers = []

io.on('connection', socket => {
    socket.on('join server', data => {
        const user = {
            username: data.username,
            id: socket.id
        }
        onlineUsers.push(user)
        io.emit('new user', onlineUsers)
    })

    socket.on('new message', async data => {
        try {
            if (data.message === '') return

            const body = {
                username: data.username,
                date: dateFormat(data.date, 'chatFormat'),
                message: data.message
            }

            const user = await Users.findOne({ username: data.username })

            const search = (key, array) => {
                for (let i=0; i < array.length; i++) {
                    if(array[i].id === key) {
                        return array[i]
                    }
                }
            }
            
            const chat = search(data.id, user.chats)

            console.log(chat)

            chat.messages.push(body)
            user.save()

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

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(u => u.id !== socket.id)
        io.emit('new user', onlineUsers)
    })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})