const express = require('express')
const router = express.Router()

router
.get('/', (req, res) => {
    res.render('pages/index')
})
.post('/storeUser', (req, res) => {
    req.session.username = req.body.username

    res.redirect('/chat')
})

module.exports = router