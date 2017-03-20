var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/registrazione', function(req, res, next) {
  res.render('registrazione');
});


module.exports = router;
