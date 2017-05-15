/**
 * Created by kevingu on 2/21/16.
 */
'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
 * Appointment schema
 */

//TODO add last and first name field
var appointmentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date: {type: Date, required: true},
    provider_name: {type: String, required: true},
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
});

module.exports = mongoose.model('appointment', appointmentSchema);
