var express = require('express')
var router = express.Router();

var loginRequire = require('../lib/middleware/loginRequire');
// POST /post/create

router.get('/:id', loginRequire, (req, res) => {
    res.render('personal', { title: 'Personal Page' });
})


module.exports = router;

