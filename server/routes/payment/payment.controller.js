'use strict';

let BASIC_PLAN_ID = 'emissary_basic';

let Company = require('../../models/Company');

let stripe = require('stripe')(
  'sk_test_dqzYJJ6xWGgg6U1hgQr3hNye'
); // TODO: do i need to do this for every js file that uses stripe?

exports.createSubscription = function(req, res) {
	// create customer, TODO: could there be an existing stripe customer ID?
	stripe.customers.create({ // calls stripe customer create
		description: 'Customer for '+req.body.stripeEmail,
		plan: BASIC_PLAN_ID, // TODO: move this string to a global constant
		source: req.body.stripeToken,
	}, function(err, customer) { // passes err and customer to  cb for handling
		if (err) {
			return res.status(400).send({error: 'Could not create customer'});
		}
		// TODO: set company's subscribed to true and
		// save customerID to account with a call to api/companies/update?
		// use localstorage to retrieve id of which company to update?
	});
};

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

function basicPlanIndex(arr) {
	let arrLength = arr.length;
	for(let i = 0; i < arrLength; i++) {
		if (arr[i].plan.id==BASIC_PLAN_ID) {
			return i;
		}
	}
	return -1;
}
