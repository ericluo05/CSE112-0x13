'use strict';

let mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

let Schema = mongoose.Schema;

let appointmentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date: {type: Date, required: true},
    provider_name: {type: String, required: true},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});

let visitorSchema = new Schema({
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    checkin_time: {type: Date, default: Date.now, required: true},
    appointments: {type: [appointmentSchema]},
    additional_info: {},
});


let visitorListSchema = new Schema({
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    visitors: {type: [visitorSchema], default: []},
});

module.exports = mongoose.model('visitorList', visitorListSchema);
