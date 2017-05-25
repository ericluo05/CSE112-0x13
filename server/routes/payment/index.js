'use strict';

let express = require('express');
let controller = require('./payment.controller');

let router = new express.Router();

router.post('/payment/subscription', controller.createSubscription);
router.get('/payment/subscription/:id', controller.getSubscription);

module.exports = router;
