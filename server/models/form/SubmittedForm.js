let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let submittedForm = new mongoose.Schema({
  form: {type: Object},
  firstName: {type: String},
  lastName: {type: String},
  patientEmail: {type: String},
  date: {type: Date, default: Date.now},
  _admin_id: {type: Schema.Types.ObjectId, ref: 'Admin', required: true},

});

// let encrypt = require('mongoose-encryption');
// form encryption not used
// let encKey = process.env.ENC_KEY_PATIENT_FORM ||
//    '5eNeIqic3hPw5LH1QhetW+938egawC6tGbJG2OYgGW8=';
// let sigKey = process.env.SIG_KEY_PATIENT_FORM ||
//    '9WXlnC2CxAZ3ZzQbsai9wKcymwDVYVp7v7nJ+';

// submittedForm.plugin(encrypt, {encryptionKey: encKey, signingKey: sigKey});

module.exports = mongoose.model('SubmittedForm', submittedForm);
