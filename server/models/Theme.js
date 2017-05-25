'use strict';

// monggose set up
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 *
 * @api var ThemeSchema
 * @apiDescription This is a form declaritation for what a form has.
 * Determines what the form looks like.
 * For more information on Schemas visit http://mongoosejs.com/docs/guide.html
 * @apiName employeeSchemacorrectPassword
 * @apiGroup Schema Series
 *
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
