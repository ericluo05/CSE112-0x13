'use strict';

// monggose set up
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema for user theme settings
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
