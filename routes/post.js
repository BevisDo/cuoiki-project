var express = require('express')
var router = express.Router();
var verify = require('../lib/middleware/auth')

var {postController}  = require('../controller/post')

router.post('/create',verify, postController);


module.exports = router;

