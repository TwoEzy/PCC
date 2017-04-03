var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/registrazione', function(req, res, next) {
  res.render('registrazione');
});

router.get('/builds', function(req, res, next) {
  res.render('builds');
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

router.get('/community', function(req, res, next) {
  res.render('community');
});

module.exports = router;
