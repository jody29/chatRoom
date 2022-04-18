const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    username: String,
    password: String,
    chats: [
        {
            username: String,
            date: String,
            message: String
        }
    ],
})

const Users = mongoose.model('chats', messageSchema)

module.exports = Users