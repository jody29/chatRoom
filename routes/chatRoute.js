const express = require('express')
const Users = require('../model/model.js')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const auth = require('../authentication/auth.js')

router
.get('/chatOverview', auth ,async (req, res) => {
    try {
        const user = await Users.find({})

        let chats = []

        user.forEach(user => {
            user.chats.forEach(chat => {
                chats.push({
                    chat: chat,
                    amount: chat.users.length
                })
            })
        })

        res.render('pages/chatoverview', {
            username: req.session.username,
            chats: chats
        })
    } catch (err) {
        console.log(err)
    }
})
.post('/createRoom', async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username })

        console.log(user)

        user.chats.push({
            users: [req.body.username],
            id: uuidv4(),
            name: req.body.room
        })

        user.save()

        res.redirect('/chatOverview')
        
    } catch (err) {
        console.log(err)
    }
})
.get('/chats/:id', auth, async (req, res) => {
    try { 
        const user = await Users.findOne({ username: req.session.username })

        const search = (key, array) => {
            for (let i=0; i < array.length; i++) {
                if(array[i].id === key) {
                    return array[i]
                }
            }
        }

        const chat = search(req.params.id, user.chats)

        res.render('pages/chat', {
            username: req.session.username,
            roomId: req.params.id,
            chat

        })
    } catch (err) {
        console.log(err)
    }
})
.post('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

module.exports = router