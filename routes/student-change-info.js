var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('student-change-info', { title: 'Change info account' });
});

module.exports = router;
