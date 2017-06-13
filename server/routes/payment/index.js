'use strict';

let express = require('express');
let controller = require('./payment.controller');

let router = new express.Router();

/**
 * @api {post} /payment/subscription/:id Make payment
 * @apiDescription User will be charged for fee of 1 month and subscription length
 * will be extended by 1 month as well
 * @apiName CreateSubscription
 * @apiGroup Payment
 * @apiParam {string} id Id of the company
 * @apiParam {string} stripeEmail the email for subscriber
 * @apiParam {int} stripeToken stripeToken associated with customer
 * @apiUse CompanyData
 * @apiError (Error 400) CanNotFind cant find company associated with company id
 * @apiError (Error 400) CanNotPay unable to process payment with stripe
 * @apiError (Error 400) CanNotSave unable to save payment to database
 * @apiError (Error 400) CanNotUpdate unable to update company subscription
 */
router.post('/subscription/:id', controller.createSubscription);

// /*
//  * @api {get} /payment/subscription/:id getSubscription
//  * @apiDescription This is used to verify whether a company has a subscription
//  * and get that subscription
//  * @apiName PaymentgetSubscription
//  * @apiGroup Payment
//  *
//  * @apiParam {int} company_id identifier for a company
//  * @apiSuccess {JSON} subscription all the info about the subscription in JSON
//  * @apiError CouldNotFind does not have a sub or company does not exist
//  */
//
// router.get('/subscription/:id', controller.getSubscription);

module.exports = router;
