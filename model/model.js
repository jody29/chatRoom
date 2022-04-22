const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    chats: [
        {
            room: String,
            roomId: String,
        }
    ]
})

const messageSchema = new Schema({
    room: String,
    roomId: String,
    users: [
        {
            username: String,
            userId: String
        }
    ],
    messages: [
        {
            username: String,
            date: String,
            message: String
        }
    ]
})

const Users = mongoose.model('users', userSchema)
const Chats = mongoose.model('chats', messageSchema)

module.exports = {
    Users,
    Chats
}