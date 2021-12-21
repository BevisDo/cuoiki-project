var express = require('express');
const { commentCreateController, commentDeleteCotroller } = require('../controller/comment');
var router = express.Router();
var verify = require('../lib/middleware/auth')

router.put('/create/:id', verify, commentCreateController);
router.delete('/:id', verify, commentDeleteCotroller)
module.exports = router;