/* eslint-disable no-invalid-this */

// let request = require('supertest');
// let config = require('../../server/config/config');
// Wrapper that creates admin user to allow api calls
// let ConfigureAuth = require('./ConfigureAuth');
// let Employee = require('../../server/models/Employee');


let Email = require('../../server/notification/email');
let TextModel = require('../../server/notification/sms');

// SAMPLE : [{phone_number: "XXX-XXX-XXXX", email: "XXXXX@XXXXX.com"}];
let employees = [];

describe('Notification', function() {
    it('It should send an email', function(done) {
      this.timeout(9000);
      Email.sendEmail('Tony Montana', employees, done);
      // done();
    });

    it('It should send an text', function(done) {
      this.timeout(9000);
      TextModel.sendText('Tony Montana', employees, done);
      // done();
    });
  }
);
