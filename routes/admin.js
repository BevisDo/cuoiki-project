const express = require('express')
const auth = require('../controller/auth')
const adminCheck = require('../lib/middleware/admincheck')
const router = express.Router()

//signup
router.get('/', adminCheck, function (req, res) {
    res.render('signup', { title: 'Đăng ký phòng khoa' })
})
router.post('/', auth.pk_signup);


module.exports = router;