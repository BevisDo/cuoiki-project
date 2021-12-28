const jwt = require('jsonwebtoken')
const alert = require('alert')

const adminCheck = (req, res, next) => {
        var token = req.cookies.token
        // var ketqua = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        var userId = jwt.decode(token).userId
        console.log(userId)
        if (userId == '61c6e4e33d47daaceeecf1e3') {
            next()
        }else {
            alert('Ban khong phai Admin')
            res.redirect('/')
        }
}

module.exports = adminCheck