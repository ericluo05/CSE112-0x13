/* eslint-disable new-cap */
let express = require('express');
let router = express.Router();
let path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+ './../../build/html/homepage.html'));
});

module.exports = router;
