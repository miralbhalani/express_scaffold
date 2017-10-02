var express = require('express');
var router = express.Router();

var collegeUsers = require("./collegeUsers");
var students = require("./students");
var collages = require("./collages");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); 
});


router.post('/login', collegeUsers.ext.login);
router.use('/collage-users', collegeUsers.router);
router.use('/students', students.router);
router.use('/collages', collages.router);

module.exports = router;
