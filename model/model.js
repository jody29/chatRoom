const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    username: String,
    password: String,
    chats: [
        {
            users: [],
            id: String,
            name: String,
            messages: [
                {
                    username: String,
                    date: String,
                    message: String
                }
            ]
        }
    ],
})

const Users = mongoose.model('chats', messageSchema)

module.exports = Users