let mongoose = require('mongoose');
let Schema = new mongoose.Schema;

/**
 *
 * @api variable companySchema
 * @apiDescription This is a form declaritation for what a company is.
 * This is basically an admin user for a company there is just one per comp.
 * For more information on Schemas visit http://mongoosejs.com/docs/guide.html
 * @apiName companySchema
 * @apiGroup Schema Series
 *
 */

let companySchema = new Schema({
    email: {type: String, unique: true, index: true, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    paid_time: {type: Date, required: true},
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
