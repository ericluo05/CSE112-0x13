'use strict';
/**
 * @class Company
 * @classdesc  Manage schema for each company.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/** MongoDB Schema for Company
 * @memberOf Company
 * @typedef {CompanySchema}
 * @property {String} email - the company's email address
 * @property {String} name - name of the company
 * @property {String} phone_number - the company's phone number
 * @property {Date} paid_time - time of the company's last payment
 */
let companySchema = new Schema({
    email: {type: String, unique: true, index: true, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    paid_time: {type: Date, required: true},
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
