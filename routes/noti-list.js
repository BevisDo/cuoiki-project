var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('noti-list', { title: 'Notification List' });
});

module.exports = router;