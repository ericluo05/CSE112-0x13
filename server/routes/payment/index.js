'use strict';

let express = require('express');
let controller = require('./payment.controller');

let router = new express.Router();

/**
 * @api {post} /payment/subscription CreateSubscription
 * @apiDescription This is used to create a new Service Subscription.
 * @apiName PaymentcreateSubscription
 * @apiGroup Payment
 *
 * @apiParam {string} stripeEmail the email for subscriber
 * @apiParam {int} stripeToken dunno
 * @apiError CouldNotCreate failed to create because of any reason
 */
router.post('/payment/subscription', controller.createSubscription);

/**
 * @api {get} /payment/subscription/:id getSubscription
 * @apiDescription This is used to verify whether a company has a subscription
 * and get that subscription
 * @apiName PaymentgetSubscription
 * @apiGroup Payment
 *
 * @apiParam {int} company_id identifier for a company
 * @apiSuccess {JSON} subscription all the info about the subscription in JSON
 * @apiError CouldNotFind does not have a sub or company does not exist
 */

router.get('/payment/subscription/:id', controller.getSubscription);

module.exports = router;
