const express = require('express')
const auth = require('../controller/auth')
const adminCheck = require('../lib/middleware/admincheck')
const loginRequire = require('../lib/middleware/loginRequire')

const router = express.Router()

//signup
router.get('/', loginRequire, adminCheck, function (req, res) {
    res.render('signup', { title: 'Đăng ký phòng khoa' })
})
router.post('/', auth.pk_signup);


module.exports = router;