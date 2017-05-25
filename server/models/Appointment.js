'use strict';
/**
 * MongoDB Schema
 * @namespace Schema
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * MongoDB Schema for Appointment
 * @memberOf Schema
 * @typedef {AppointmentSchema} Appointment
 * @property {String} first_name - First name of person making the appointment
 * @property {String} last_name - Last name of person making the appointment
 * @property {string} phone_number - phone number of the person making the appointment
 * @property {Date} date - date when the appointment is created
 * @property {String} provider_name - ???
 * @property {int} company_id - object id of company schema for which the
 *  employee belongs to
 */
let appointmentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date: {type: Date, required: true},
    provider_name: {type: String, required: true},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});

module.exports = mongoose.model('appointment', appointmentSchema);
