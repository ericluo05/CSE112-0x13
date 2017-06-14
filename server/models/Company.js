'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/** MongoDB Schema for Company
 * @memberOf Schema
 * @typedef {CompanySchema} Company
 * @property {String} email - the company's email address
 * @property {String} name - name of the company
 * @property {String} phone_number - the company's phone number
 * @property {Date} paid_time - time of the company's last payment
 * @property {Date} create_time - time in which the company is created
 * @property {Date} sub_expiration - time in which the subscription expires
 * @property {Number} num_months_subscribed - number of months the number is subscribed
 * @property {Number} revenue: total amount paid by this company thus far, include
 *             payments for subscriptions for future months, it is probably better
 *             to not allow advanced payment as it can lead to "bogus" sale/data
 *             in case of cancellation
 * @property {Number} num_employees number of registered employees
 */
let companySchema = new Schema({
    email: {type: String, unique: true, index: true, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    paid_time: {type: Date, required: true},
    create_time: {type: Date, required: true, default: Date.now()},
    sub_expiration: {type: Date, required: true, default: Date.now()},
    num_months_subscribed: {type: Number, required: true, default: 0},
    revenue: {type: Number, required: true, default: 0},
    num_employees: {type: Number, required: true, default: 0},
}, {versionKey: false});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
