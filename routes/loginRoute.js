const express = require('express')
const Users = require('../model/model')
const router = express.Router()

router
.get('/', (req, res) => {
    res.render('pages/index')
})
.post('/storeUser', async (req, res) => {
    const user = await Users.findOne({ username: req.body.username })

    

    res.redirect('/chat')
})

module.exports = router