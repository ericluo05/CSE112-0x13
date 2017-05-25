let mongoose = require('mongoose');

// define the schema for our user model
let companySchema = new mongoose.Schema({
    email: {type: String, unique: true, index: true, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    paid_time: {type: Date, required: true},
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
