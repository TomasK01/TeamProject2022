var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedIn = req.session.loggedIn;
  res.render('laptop', { title: 'Laptop' ,loggedIn});
});

module.exports = router;
