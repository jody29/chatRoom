const express = require('express')
const Users = require('../model/model')
const router = express.Router()

router
.get('/register', (req, res) => {
    res.render('pages/register')
})
.post('/registerUser', async (req, res) => {
    const user = await Users.findOne({ username: req.body.username })

    console.log(user)

    if (user == null) {
        Users.create(req.body)
        res.redirect('/')
    } else {
        res.render('pages/register', {
            message: 'username allready exists'
        })
    }  
})

module.exports = router