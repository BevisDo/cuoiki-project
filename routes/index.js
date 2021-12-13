var express = require('express');
const loginRequire = require('../lib/middleware/loginRequire');
var router = express.Router();

/* GET home page. */
router.get('/', loginRequire, function (req, res, next) {
  res.render('index', { title: 'Homepage' });
});

module.exports = router;
