'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * MongoDB Schema for Theme
 * @memberOf Schema
 * @typedef {ThemeSchema} Theme
 * @property {String} user_id - user's id
 * @property {String} form_color - color as hex string ?
 * @property {String} background_img - background image
 * @property {Boolean} displayPhone - display phone number or not
 * @property {Boolean} displayClock - display clock or not
 * @property {Boolean} displaySignature - display signature or not
 * @property {Boolean} additionalComments - display additional comments or not
 */
let ThemeSchema = new Schema({
    user_id: String,
    form_color: String,
    background_img: String,
    displayPhone: Boolean,
    displayClock: Boolean,
    displaySignature: Boolean,
    additionalComments: Boolean,
});

// Export schema
module.exports = mongoose.model('Theme', ThemeSchema);
