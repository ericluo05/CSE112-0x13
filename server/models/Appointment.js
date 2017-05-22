'use strict';

/* Require mongoose to interact with mongoDB */
let mongoose = require('mongoose');
let Schema = new mongoose.Schema;
/*
 * Appointment schema
 */

// TODO add last and first name field
let appointmentSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date: {type: Date, required: true},
    provider_name: {type: String, required: true},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});

module.exports = mongoose.model('appointment', appointmentSchema);
