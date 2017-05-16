/* Require mongoose to interact with mongoDB */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * This will be the Schema for the Form Template Documents.
 **/
let formTemplate = new mongoose.Schema({
  _admin_id: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
  },
  template: {
      type: Object,
  },
});

module.exports = mongoose.model('FormTemplate', formTemplate);
