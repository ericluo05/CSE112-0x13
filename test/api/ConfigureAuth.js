let request = require('supertest');

let config = require('../../server/config/config');

let AdminUser = require('../../server/models/Company');
let Employee = require('../../server/models/Employee');


function setupEmployee(done) {
  setupAdmin(done, true);
}


function setupAdmin(done) {
  setupUser(done, false);
}


function setupUser(done, isEmployee) {
  let path = isEmployee ? '/employees' : '/api/companies';
  // let UserModel = isEmployee ? Employee : AdminUser;

  let token;
  let admin;

  // Add random number to email to reduce concurrency issue chances on
  // duplicate unique key errors.
  let email = 'test' + Math.floor(Math.random() * 100000) + '@test.com';
  let password = 'test_password';
  let creditCardNumber='1231231241251';
  let name = 'test';
  let expirationDate='6/17';
  let phoneNumber='1234567890';

  let url = 'localhost:' + config.port;
  request(url)
      .post(path)
      .send({
        email: email,
        password: password,
        credit_card_number: creditCardNumber,
        name: name,
        expiration_date: expirationDate,
        phone_number: phoneNumber,
      })
      .expect(200)
      .end(function(err, res) {
          if(err)
            throw(err);
          res.body.should.have.property('_id');
          login(res.body._id);
      });


  function login(id) {
    request(url)
        .get(path+'/'+id)
        .expect(200)
        .end(function(err, res) {
          if(err)
            throw(err);
          retrieveAdmin();
        });
  }


  function retrieveAdmin() {
    AdminUser.findOne({email: email}, function(err, dbAdmin) {
      if(err)
        throw(err);
      admin = dbAdmin;
      done({
        admin: admin,
        email: email,
        password: password,
        token: token,
      });
    });
  }
}

function cleanupAuth(email, callback) {
  AdminUser.remove({email: email}, function(err) {
    if(err)
      throw(err);
    callback();
  });
}

function cleanupEmployee(email, callback) {
  Employee.remove({email: email}, function(err) {
    if(err)
      throw(err);
    callback();
  });
}

module.exports.setupAdmin = setupAdmin;
module.exports.setupEmployee = setupEmployee;
module.exports.cleanupAuth = cleanupAuth;
module.exports.cleanupEmployee = cleanupEmployee;
