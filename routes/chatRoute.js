const express = require('express')
const Users = require('../model/model.js')
const router = express.Router()

router
.get('/chat', async (req, res) => {
    if (req.session.username) {
        const chats = await Users.find({})

        console.log(chats)

        res.render('pages/chat', {
            username: req.session.username,
            chats
        })
    } else {
        res.redirect('/')
    }
})

module.exports = router