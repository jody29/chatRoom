const isAuthenticated = (req, res, next) => {
    if (req.session.username != undefined) return next()
    res.redirect('/')
}

module.exports = isAuthenticated