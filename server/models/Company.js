/**
 * Created by kevingu on 2/12/16.
 */
// load the things we need
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
let companySchema = mongoose.Schema({
    email: {type: String, unique: true, index: true, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    paid_time: {type: Date, required: true},
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
