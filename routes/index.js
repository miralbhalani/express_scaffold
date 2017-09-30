var express = require('express');
var router = express.Router();

var collegeUsers = require("./collegeUsers");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', collegeUsers.ext.login);
router.use('/collage-users', collegeUsers.router);

module.exports = router;
