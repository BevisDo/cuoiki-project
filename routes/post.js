var express = require('express')
var router = express.Router();
var verify = require('../lib/middleware/auth')

var { postCreateController, postUpdateController, postDeleteController, postReadController, postReadControlleById, } = require('../controller/post');
var loginRequire = require('../lib/middleware/loginRequire');
// POST /post/create
router.post('/create', verify, postCreateController);
// GET /post
router.get('/', loginRequire, verify, postReadController)
// router.get('/', postReadController)
// PUT /post/id_post
router.put('/:id', verify, postUpdateController)
// DELETE /post/id_post
router.delete('/:id', verify, postDeleteController)

//GET post by userID
router.get('/:id', postReadControlleById);

module.exports = router;

