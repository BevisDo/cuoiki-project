var express = require('express')
var router = express.Router();
var verify = require('../lib/middleware/auth')

var { postCreateController, postUpdateController, postDeleteController, postReadController, } = require('../controller/post')
// POST /post/create
router.post('/create', verify, postCreateController);
// GET /post
router.get('/', verify, postReadController)
// PUT /post/id_post
router.put('/:id', verify, postUpdateController)
// DELETE /post/id_post
router.delete('/:id', verify, postDeleteController)

module.exports = router;

