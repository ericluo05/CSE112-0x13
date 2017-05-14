'use strict'

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();

router.post('/payment/subscription', controller.createSubscription);
router.get('/payment/subscription/:id', controller.getSubscription);

module.exports = router;