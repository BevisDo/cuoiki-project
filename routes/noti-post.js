var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('noti-post', { title: 'Notification Post' });
});

module.exports = router;