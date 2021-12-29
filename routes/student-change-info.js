var express = require('express');
const profile = require('../controller/profile')
var verify = require('../lib/middleware/auth')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('student-change-info', { title: 'Change info account' });
});

router.put('/', verify, profile.profileUpdateController)

module.exports = router;
