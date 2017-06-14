'use strict';
let mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

let Schema = mongoose.Schema;

/* schema already defined in appointment */
let appointmentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date: {type: Date, required: true},
    provider_name: {type: String, required: true},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
}, {versionKey: false});

/**
 * MongoDB Schema for Visitor
 * @memberOf Schema
 * @typedef {VisitorSchema} Visitor
 * @property {int} company_id -  object id of company schema
 * @property {String} first_name -  first name of visitor
 * @property {String} last_name -  last name of visitor
 * @property {Boolean} phone_number -  visitor's phone number
 * @property {Boolean} checkin_time - time when the visitor checked in
 * @property {Appointment} appointments - associated appointment
 * @property {object} additional_info - additional info
 */
let visitorSchema = new Schema({
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    checkin_time: {type: Date, default: Date.now, required: true},
    appointments: {type: [appointmentSchema]},
    additional_info: {},
}, {versionKey: false});

/**
 * MongoDB Schema for VisitorList
 * @memberOf Schema
 * @typedef {VisitorListSchema} VisitorList
 * @property {int} company_id -  object id of company schema
 * @property {Array<Visitor>} visitors - list of visitors
 */
let visitorListSchema = new Schema({
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    visitors: {type: [visitorSchema], default: []},
});

module.exports = mongoose.model('visitorList', visitorListSchema);
