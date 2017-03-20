var express = require('express');
var router = express.Router();
var nodedump = require('nodedump').dump;

/* Set session */
router.get('/set', function (req, res, next) {
    res.send('Session is set: ' + req.session.username);
});

/* Get session */
router.get('/get', function (req, res, next) {
    res.send(nodedump(req.session.username));
});

module.exports = router;