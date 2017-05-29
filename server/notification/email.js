'use strict';

require('express');

let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cse112team0x13@gmail.com',
        pass: 'team0x13',
    },
});

// sendEmail: Send email to employees when visitorList is checked in.
exports.sendEmail = function(patientName, employees, done) {
  if(employees === null || (employees.length <= 0)) {
    if(done) return done();
  }
  let len = employees.length;
  let callback = function(i) {
    return function(error, info) {
      if(error) {
        console.log(error);
        console.log('Error occurred sending email');
      }else{
      }
      if(done && len-1 === i) return done();
    };
  };
  // iterate through all employees
  if(employees === null || (employees.length <= 0))
    if(done) return done();
  for (let index = 0; index < employees.length; index++) {
    // create the email object that will be sent
    let subject = '✨'+patientName + '✨ Just Checked In';
    let mailOptions = {
      from: '"Emissary" <cse112team0x13@gmail.com>', // sender address
      to: employees[index].email, // list of receivers
      subject: subject, // Subject line
      text: 'Visitor ' + patientName + ' is here.', // plaintext body
      html: '<b>Visitor ' + patientName + ' is here.</b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, callback(index));
  }
};
