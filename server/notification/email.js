'use strict';

require('express');
// let router = express.Router();
// let bodyparser = require('body-parser');
let nodemailer = require('nodemailer');

exports.template = {};

// create reusable transporter object from company email
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'testcse112@gmail.com',
        pass: 'robo_betty',
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
        // res.json({message: "Error occurred sending email"});
      }else{
        console.log('Email was sent.');
        // res.json({message : "Email was sent." });
      }
      if(done && len-1 === i) return done();
    };
  };
  // iterate through all employees
  if(employees === null || (employees.length <= 0))
    if(done) return done();
  for (let index = 0; index < employees.length; index++) {
    // create the email object that will be sent
    let mailOptions = {
      from: 'Robo Betty <testcse112@gmail.com>', // sender address
      to: employees[index].email, // list of receivers
      subject: 'Patient ' + patientName + ' is ready', // Subject line
      text: 'Your visitorList ' + patientName + ' is here.', // plaintext body
      html: '<b>Your visitorList ' + patientName + ' is here.</b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, callback(index));
  }
};
