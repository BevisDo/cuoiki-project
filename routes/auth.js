const express = require('express')
const auth = require('../controller/auth')
const router = express.Router()


router.get('/logout', auth.pk_logout)

//login
router.get('/login', function (req, res) {
    res.render('login', { title: 'Đăng nhập', layout: false })
})
router.post('/login', auth.pk_login)



module.exports = router;