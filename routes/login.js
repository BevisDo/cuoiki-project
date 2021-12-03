const express =  require('express')
const { pk_login } = require('../controller/login')

const router = express.Router()


router.post('/signup',pk_login)

module.exports = router;