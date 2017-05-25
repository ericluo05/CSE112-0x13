'use strict';

/**
 * @file Employee.js
 */


/* Require mongoose to interact with mongoDB */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');


let employeeSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, index: true, required: true},
    password: {type: String, required: true},
    phone_number: {type: String, required: true},
    role: {type: String, required: true},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});

/**
 * @memberOf
 * @function validPassword
 * @description check if password is correct
 * @param {string} password - password (don't know if salted or not)
 * @return {boolean} password is correct or not
 */
employeeSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * @function generateHash
 * @description encrypt input password to hash
 * @param {string} password - password to hash
 * @return {string} hashed password
 */
employeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('employee', employeeSchema);
