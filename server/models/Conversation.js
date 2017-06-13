'use strict';
/**
 * MongoDB Schema
 * @namespace Schema
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * MongoDB Schema for Conversation
 * @memberOf Schema
 * @typedef {ConversationSchema} Conversation
 * @property {int} conversation_id - api.ai conversation
 * @property {String} first_name - First name of person making the appointment
 * @property {String} last_name - Last name of person making the appointment
 * @property {string} phone_number - phone number of the person making the appointment
 * @property {string} email - email of the person making the appointment
 * @property {Date} date - date when the appointment is created for
 * @property {String} time - time when the appointment is
 * @property {String} provider_name - ???
 * @property {int} company_id - object id of company schema for which the
 *  employee belongs to
 */
let conversationSchema = new Schema({
    conversation_id: {type: String, required: true},
    first_name: {type: String, required: false},
    last_name: {type: String, required: false},
    phone_number: {type: String, required: false},
    email: {type: String, required: false},
    date: {type: Date, required: false},
    time: {type: String, required: false},
    provider_name: {type: String, required: false},
}, {versionKey: false});

module.exports = mongoose.model('conversation', conversationSchema);
