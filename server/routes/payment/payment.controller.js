'use strict';
/**
 *  Module that house all the API routes that pertains to payment
 * @module routes/payment
 */
const BASIC_PLAN_ID = 'basic-monthly';
let Company = require('../../models/Company');
let Payment = require('../../models/Payment');
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


// eslint-disable-next-line valid-jsdoc
/**
 * @function createSubscription
 * @description  handler to create subscription
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createSubscription = function(req, res) {
    let companyId = req.params.id;
    let stripeEmail = req.body.stripeEmail;
    let stripeToken = req.body.stripeToken;
    let companyInfo = {};
    let newExpDate;
    let now = new Date();
    if(!stripeEmail || ! stripeToken) {
        return res.status(400).json({error: 'Missing field'});
    }

    let findCompany = new Promise(function(resolve, reject) {
        Company.findById(companyId, function(err, company) {
            if(err || !company) {
                reject({statusCode: 400, message: {error: 'Can not find'}});
            } else{
                companyInfo = company;
                // calcuate new subscription expiration date
                let currentExpDate = new Date(companyInfo.sub_expiration);
                if (currentExpDate > now) {
                    newExpDate =
                        new Date(currentExpDate.setMonth(currentExpDate.getMonth() + 1));
                } else {
                    newExpDate = new Date(now.setMonth(now.getMonth() + 1));
                }
                resolve();
            }
        });
    });
    let chargePayment = function() {
        return new Promise(function(resolve, reject) {
            stripe.charges.create({
                amount: 2000,
                currency: 'usd',
                description: 'Payment for company:' + companyInfo._id + '\nby: '
                +stripeEmail +'\nnew_exp:'+newExpDate,
                source: stripeToken,
            }, function(err, charge) {
                if(err) {
                    reject({statusCode: 400, message: {error: 'Can not pay'}});
                } else {
                    resolve();
                }
            });
        });
    };

    let addPaymentToDB = function() {
        return new Promise(function(resolve, reject) {
            let payment = new Payment();
            payment.company_id=companyId;
            payment.email = stripeEmail;
            payment.paid_time = now;
            payment.amount = 20;
            payment.token = stripeToken;
            payment.desc = 'extended subscription to ' + newExpDate;
            payment.save(function(err, p) {
               if(err) {
                   reject({statusCode: 400, message: {error: 'Can not save'}});
               } else{
                   resolve(p.amount);
               }
            });
        });
    };

    let updateCompanySubscription = function(amountCharged) {
        return new Promise(function(resolve, reject) {
            Company.findById(companyId, function(err, company) {
                if(err || !company) {
                    return reject({statusCode: 400, message: {error: 'Can not find'}});
                }
                company.num_months_subscribed +=1;
                company.revenue += amountCharged;
                company.sub_expiration = newExpDate;
                company.paid_time = now;
                company.save(function(err, c) {
                    if(err) {
                        return reject({
                            statusCode: 400,
                            message: {error: 'Can not update'},
                        });
                    }
                    return resolve(showCompanyPublicInfo(c));
                });
            });
        });
    };

    findCompany // make sure company exist first
        .then(chargePayment) // charge one time payment
        .then(addPaymentToDB) // add payment to DB
        .then(updateCompanySubscription) // update relevant fields for the company in DB
        .then(function(updatedCompanyInfo) { // send back company info
            res.status(200).json(updatedCompanyInfo);
        })
        .catch(function(error) {
// eslint-disable-next-line max-len
// FIXME implement fall back when payment is successful processed but payment is not added to DB
          res.status(error.statusCode).send(error.message);
        });
};

/**
* @private
* @function showCompanyPublicInfo
* @description put company info into an object
* @param {Object} c - company object
* @return {CompanyInfo} company info object
*/
function showCompanyPublicInfo(c) {
    return {
        _id: c._id,
        name: c.name,
        email: c.email,
        phone_number: c.phone_number,
        paid_time: c.paid_time,
        create_time: c.create_time,
        sub_expiration: c.sub_expiration,
        num_months_subscribed: c.num_months_subscribed,
        revenue: c.revenue,
        num_employees: c.num_employees,
    };
}


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
