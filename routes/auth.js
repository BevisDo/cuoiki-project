const express = require('express')
const { pk_signup } = require('../controller/signup')
const { pk_login } = require('../controller/login')
// var verify = require('../lib/middleware/auth')
const router = express.Router()

//signup
router.get('/signup', function (req, res) {
    res.render('signup', { title: 'Đăng ký phòng khoa' })
})
router.post('/signup', pk_signup);

//login
router.get('/login', function (req, res) {
    res.render('login', { title: 'Đăng nhập', Layout: false })
})
router.post('/login', pk_login)


module.exports = router;