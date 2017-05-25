'use strict';

/* Require mongoose to interact with mongoDB */
let mongoose = require('mongoose');
let Schema = new mongoose.Schema;

 /**
 *
 * @api variable appointmentSchema
 * @apiDescription This is a form declaritation for what an appointment
 * contains. Modifying this will change how the form behaves.
 * For more information on Schemas visit http://mongoosejs.com/docs/guide.html
 * @apiName AppointmentSchema
 * @apiGroup Schema Series
 *
 *
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
