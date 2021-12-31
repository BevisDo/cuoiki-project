var express = require('express');
const loginRequire = require('../lib/middleware/loginRequire');
var router = express.Router();

/* GET home page. */
router.get('/', loginRequire, function (req, res, next) {
  res.render('list-PB', { title: 'Phòng ban' });
});

module.exports = router;
