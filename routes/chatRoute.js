const express = require('express')
const router = express.Router()

router
.get('/chat', (req, res) => {
    if (req.session.username) {
        res.render('pages/chat', {
            username: req.session.username
        })
    } else {
        res.redirect('/')
    }
})

module.exports = router