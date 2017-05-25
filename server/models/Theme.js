'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * MongoDB Schema for Theme
 * @memberOf Schema
 * @typedef {ThemeSchema} Theme
 * @property {String} user_id - ???
 * @property {String} form_color - color in hex ??? no idea why string
 * @property {String} background_img - ...
 * @property {Boolean} displayPhone - ...
 * @property {Boolean} displayClock - ...
 * @property {Boolean} displaySignature - ...
 * @property {Boolean} additionalComments - ...
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
