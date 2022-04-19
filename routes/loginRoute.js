const express = require('express')
const Users = require('../model/model')
const router = express.Router()

router
.get('/', (req, res) => {
    if(req.session.username) {
        res.redirect('/chatOverview')
    } else {
        res.render('pages/index', {
            message: ''
        })
    }
})
.post('/storeUser', async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username }) 
        
        if (user != null) {
            const match = await user.password === req.body.password

            if (match) {
                req.session.username = req.body.username
                res.redirect('/chatOverview')
            } else {
                res.render('pages/index', {
                    message: 'username and password do not match'
                })
            }

        } else {
            res.render('pages/index', {
                message: 'username does not exist'
            })
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router