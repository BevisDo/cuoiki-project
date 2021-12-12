const jwt = require('jsonwebtoken')

const loginRequire = (req, res, next) => {
    try {
        var token = req.cookies.token
        var ketqua = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (ketqua) {
            next()
        }
    } catch (error) {
        // return console.log(error)
        return res.redirect('/auth/login')
    }
}
module.exports = loginRequire