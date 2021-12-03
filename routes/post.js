var express = require('express')
var router = express.Router();

var postsController  = require('../controller/post')

router.post('/create', postsController.create);

module.exports = router;