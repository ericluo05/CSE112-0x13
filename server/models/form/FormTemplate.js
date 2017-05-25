'use strict';
/**
 * @class FormTemplate
 * @classdesc ???
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/** MongoDB Schema for FormTemplate
 * @memberOf FormTemplate
 * @typedef {FormTemplateSchema}
 * @property {int} _admin_id - object id of company schema
 * @property {object} template - ??????????????
 */
let formTemplate = new Schema({
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
