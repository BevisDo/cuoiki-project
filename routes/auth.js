const express = require('express')
const auth = require('../controller/auth')
const router = express.Router()

//signup
router.get('/signup', function (req, res) {
    res.render('signup', { title: 'Đăng ký phòng khoa' })
})
router.post('/signup', auth.pk_signup);

router.get('/logout', auth.pk_logout)

//login
router.get('/login', function (req, res) {
    res.render('login', { title: 'Đăng nhập', layout: false })
})
router.post('/login', auth.pk_login)



module.exports = router;