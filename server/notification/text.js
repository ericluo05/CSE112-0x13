'use strict';
let accountSid = 'AC7b31bcaa651ee910751dddfa1742dbbb';
let authToken = 'fc7e2b8962e03d9a0c813667054722c0';
let client = require('twilio')(accountSid, authToken);

// sendText: Send text message to employees when visitorList is checked in.
exports.sendText = function(patientName, employees, done) {
  if(employees === null || (employees.length <= 0)) {
    if(done) return done();
  }

  let len = employees.length;
  let callback = function(i) {
    return function(error, message) {
      if(done && len-1 == i) done();
    };
  };
  // it appears that twilio can validate the phone number for us, hooray
  for (let index = 0; index < employees.length; index++) {
    client.messages.create({
      to: employees[index].phone_number,
      from: '+15623035425',
      body: '✨ ' + patientName + ' ✨ is ready.',
    }, callback(index));
  }
};

