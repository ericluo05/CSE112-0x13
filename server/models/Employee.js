'use strict';

/* Require mongoose to interact with mongoDB */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

/**
 *
 * @api variable employeeSchema
 * @apiDescription This is a form declaritation for what 1 employee has.
 * Modifying this will change what information you need to create an employee.
 * For more information on Schemas visit http://mongoosejs.com/docs/guide.html
 * @apiName employeeSchema
 * @apiGroup Schema Series
 *
 */
let employeeSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, unique: true, index: true, required: true},
  password: {type: String, required: true},
  phone_number: {type: String, required: true},
  role: {type: String, required: true},
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});

/**
 *
 * @api employeeSchema.method validPassword
 * @apiDescription Checks if inputed password is correct one. Or at least thats
 *  what I think. I doubt it does a validity check because you don't need db for
 *  that. Need to rename
 * @apiName employeeSchemacorrectPassword
 * @apiGroup Schema Series
 *
 */

employeeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
/**
 *
 * @api employeeSchema.method generateHash
 * @apiDescription generates a hash for the password and makes it the new one
 * @apiName employeeSchemahashPassword
 * @apiGroup Schema Series
 *
 */

employeeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = mongoose.model('employee', employeeSchema);
