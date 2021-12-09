// <<<<<<< HEAD
// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('login', { title: 'Login' });
// });
// =======
const express = require('express')
const { pk_login } = require('../controller/login')

const router = express.Router()


router.post('/signup', pk_login)
// >>>>>>> f1789d0 (Squashed commit of the following:)

module.exports = router;