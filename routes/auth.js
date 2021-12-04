const express =  require('express')
const { pk_signup } = require('../controller/signup')
const { pk_login } = require('../controller/login')
// var verify = require('../lib/middleware/auth')

const router = express.Router()


router.post('/signup',pk_signup);
router.post('/login',pk_login)

module.exports = router;