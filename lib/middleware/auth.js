const jwt = require('jsonwebtoken')

//dinh dang cua Authorization: Bearer asfsfafafafadfadfadsf

const verify = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(401).json({ succes: false, message: 'Access token no found' })
    try {
        //kiem tra token chuan det
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //request luon ca userId
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = verify

const loginRequire = (req, res, next) => {
    try {
        var token = req.cookies.token
        var ketqua = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (ketqua) {
            next()
        }
    } catch (error) {
        return res.redirect('/auth/login')
    }
}
module.exports = loginRequire