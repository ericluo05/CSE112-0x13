'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');
/**
 * MongoDB Schema for Employee
 * @memberOf Schema
 * @typedef {EmployeeSchema} Employee
 * @property {String} first_name - first name of employee
 * @property {String} last_name - last name of employee
 * @property {String} email - email of employee
 * @property {String} password - hashed password of the employee
 * @property {String} phone_number - phone number of the employee
 * @property {String} role - role of the employee
 *       [c_admin - company admin]
 *       [c_receptionist: compay receptionist]
 *       [c_employee: company employee]
 *       [a_admin: app administrator]
 * @property {int} company_id - object id of company schema for which the
 * @property {Boolean} receive_sms - receive sms or not, default = false
 * @property {Boolean} receive_email - receive email or not, default = false
 *  employee belongs to
 */

let employeeSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, index: true, required: true},
    password: {type: String, required: true},
    phone_number: {type: String, required: true},
    role: {type: String, required: true},
    receive_sms: {type: Boolean, required: true, default: false},
    receive_email: {type: Boolean, required: true, default: false},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
}, {versionKey: false});

/**
 * @function Employee.validPassword
 * @description check if password is correct
 * @param {string} password - password (don't know if salted or not)
 * @return {boolean} password is correct or not
 */
employeeSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * @function Employee.generateHash
 * @description encrypt input password to hash
 * @param {string} password - password to hash
 * @return {string} hashed password
 */
employeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('employee', employeeSchema);
