'use strict';
/**
 *  Module that house all the API routes that pertains to payment
 * @module routes/payment
 */
const BASIC_PLAN_ID = 'basic-monthly';
let Company = require('../../models/Company');
let stripe = require('stripe')('sk_test_9u87L1TWt5m42Y6qg744m53l');


// This only needs to be ran once
/*
let plan = stripe.plans.create({
    name: 'Basic Plan',
    id: BASIC_PLAN_ID,
    interval: 'month',
    currency: 'usd',
    amount: 2000,
}, function(err, plan) {
});
*/


/**
 * @function createSubscription
 * @description  handler to create subscription
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createSubscription = function(req, res) {
//
//     stripe.customers.create({
//         email: req.body.stripeEmail,
//         source: req.body.stripeToken,
//     }).then(function(customer) {
//         // YOUR CODE: Save the customer ID and other info in a database for later.
//         return stripe.charges.create({
//             amount: 1000,
//             currency: "usd",
//             customer: customer.id,
//         });
//     }).then(function(charge) {
//         // Use and save the charge info.
//     });
//
// // YOUR CODE (LATER):
// // When it's time to charge the customer again, retrieve the customer ID.
//     stripe.charges.create({
//         amount: 1500, // $15.00 this time
//         currency: "usd",
//         customer: customerId,
//     });
    console.log(req.params.id);
    console.log(req.body);
    res.status(204);
    /*
    // menu from checkout.stripe.com
	stripe.customers.create({ // calls stripe customer create
        email: req.body.stripeEmail,
		description: 'Customer for ???',
		source: req.body.stripeToken,
        plan: BASIC_PLAN_ID,
	}, function(err, customer) { // passes err and customer to  cb for handling
		if (err) {
			return res.status(400).send({error: 'Could not create customer'});
		}
		console.log(customer);
        res.status(200).send('Payment Successful"');
		// TODO: set company's subscribed to true and
		// save customerID to account with a call to api/companies/update?
		// use localstorage to retrieve id of which company to update?
	});*/
};

/**
 * @function getSubscription
 * @description  handler to get subscription
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getSubscription = function(req, res) {
	Company.findOne({_id: req.params.id}, function(err, result) {
		let stripeCustomerID = result.stripeCustomerID;
		stripe.customers.listSubscriptions(stripeCustomerID,
			function(err, subscriptions) {
				let subList = subscriptions.data;
				let index = basicPlanIndex(subList);
				if (index == -1) {
					return res.status(200).json({error: 'Could not find'});
				}				else {
					return res.status(200).json(subList[index]);
				}
			});
	});
};

/**
 * @private
 * @function basicPlanIndex
 * @description don't know what this is doing
 * @param {array} arr - array of subscribed company
 * @return {int} return index of subscribed company, -1 if not subscribed
 */
function basicPlanIndex(arr) {
	let arrLength = arr.length;
	for(let i = 0; i < arrLength; i++) {
		if (arr[i].plan.id==BASIC_PLAN_ID) {
			return i;
		}
	}
	return -1;
}
