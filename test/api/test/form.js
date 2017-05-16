var request = require('supertest');

var config = require('../../../server/config/config');

// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');


// Test data
var templateForm = {
  "form_id": 1,
  "form_name": "My Form",
  "form_fields": [
    {
      "field_id": 1,
      "field_title": "Name",
      "field_type": "textfield",
      "field_value": "",
      "field_required": true,
      "field_disabled": false
    },
    {
      "field_id": 3,
      "field_title": "Email",
      "field_type": "email",
      "field_value": "",
      "field_required": true,
      "field_disabled": false
    },
    {
      "field_id": 4,
      "field_title": "Are you sick",
      "field_type": "checkbox",
      "field_value": "",
      "field_required": true,
      "field_disabled": false
    }
  ]
};
var submittedForm = {
  "form_id": "1",
  "form_name": "My Test Form",
  "form_fields": {
    "1": {
      "field_id": 1,
      "field_title": "First Name",
      "field_type": "textfield",
      "field_value": "John",
      "field_required": true,
      "field_disabled": false
    },
    "2": {
      "field_id": 2,
      "field_title": "Last Name",
      "field_type": "textfield",
      "field_value": "Doe",
      "field_required": true,
      "field_disabled": false
    },
    "3": {
      "field_id": 3,
      "field_title": "Gender",
      "field_type": "radio",
      "field_value": "1",
      "field_required": true,
      "field_disabled": false,
      "field_options": [
        {
          "option_id": 1,
          "option_title": "Male",
          "option_value": 1
        },
        {
          "option_id": 2,
          "option_title": "Female",
          "option_value": 2
        }
      ]
    },
    "4": {
      "field_id": 4,
      "field_title": "Email Address",
      "field_type": "email",
      "field_value": "test@example.com",
      "field_required": true,
      "field_disabled": false
    },
    "5": {
      "field_id": 5,
      "field_title": "Password",
      "field_type": "password",
      "field_value": "hello",
      "field_required": true,
      "field_disabled": false
    },
    "6": {
      "field_id": 6,
      "field_title": "Birth Date",
      "field_type": "date",
      "field_value": "01.21.1980",
      "field_required": true,
      "field_disabled": false
    },
    "7": {
      "field_id": 7,
      "field_title": "Your browser",
      "field_type": "dropdown",
      "field_value": "3",
      "field_required": false,
      "field_disabled": false,
      "field_options": [
        {
          "option_id": 1,
          "option_title": "-- Please Select --",
          "option_value": 1
        },
        {
          "option_id": 2,
          "option_title": "Internet Explorer",
          "option_value": 2
        },
        {
          "option_id": 3,
          "option_title": "Google Chrome",
          "option_value": 3
        },
        {
          "option_id": 4,
          "option_title": "Mozilla Firefox",
          "option_value": 4
        }
      ]
    },
    "8": {
      "field_id": 8,
      "field_title": "Additional Comments",
      "field_type": "textarea",
      "field_value": "test",
      "field_required": false,
      "field_disabled": false
    },
    "9": {
      "field_id": 9,
      "field_title": "I accept the terms and conditions.",
      "field_type": "checkbox",
      "field_value": "1",
      "field_required": true,
      "field_disabled": false
    },
    "10": {
      "field_id": 10,
      "field_title": "I have a secret.",
      "field_type": "hidden",
      "field_value": "X",
      "field_required": false,
      "field_disabled": false
    }
  },
  "submitted": true
};


describe("Forms", function() {
    var url = "localhost:" + config.port;

    var credentials;

    before(function(done) {
      ConfigureAuth.setupAdmin(function(cred) {
        credentials = cred;
        done();
      });
    });


    /********** TEMPLATE TESTING **********/

    var templateFormId = null;
    describe("Form Templates", function() {
      describe('POST /api/form/template', function(){
        it('should save the template', function(done){
          request(url)
            .post('/api/form/template')
            .query({email: credentials.email, token: credentials.token, isAdmin:true})
            .expect(200)
            .send({
              _admin_id: credentials.admin._id,
              template: templateForm,
            })
            .end(function(err, res){
              templateFormId = res.body._id;
              res.body.should.have.property('_admin_id').and.be.equal(''+credentials.admin._id);
              res.body.should.have.property('template').and.be.instanceof(Object);
              done();
            });
        });
      });

      describe('GET /api/form/template/company/:id', function(){
        it('Should respond with company template data', function(done){
          request(url)
            .get('/api/form/template/company/' + credentials.admin._id)
            .query({email: credentials.email, token: credentials.token, isAdmin:true})
            .end(function(err, res){
              res.body.should.have.property('_id');
              res.body.should.have.property('_admin_id');
              res.body.should.have.property('template').and.be.instanceof(Object);

              res.body.template.should.deep.equal(templateForm);
              res.body._id.should.equal(templateFormId);
              done();
            });
        });
      });

      describe('DELETE /api/form/template/:template_id', function(){
        it('Should delete the template data', function(done){
          request(url)
            .delete('/api/form/template/' + templateFormId)
            .query({email: credentials.email, token: credentials.token, isAdmin:true})
            .end(function(err, res){
              res.body.should.have.property('_id');
              res.body.should.have.property('_admin_id');
              res.body.should.have.property('template').and.be.instanceof(Object);

              res.body.template.should.deep.equal(templateForm);
              res.body._id.should.equal(templateFormId);
              done();
            });
        });
      });
    });



    /********** PATIENT FORM TESTING **********/


    describe("Submitted Forms", function() {
      describe('POST /api/form/visitorList', function(){
        it('should save submitted form', function(done){
          request(url)
            .post('/api/form/visitorList')
            .query({email: credentials.email, token: credentials.token, isAdmin:true})
            .send({
              _admin_id: credentials.admin._id,
              form: submittedForm,
              firstName: "Jimbo",
              lastName: "Cruise",
              patientEmail: "jcruise@tomcruise.com",
            })
            .end(function(err, res){
              //console.log(err);
              //console.log(res);
              res.body.should.have.property('form').and.be.instanceof(Object);
              res.body.should.have.property('_admin_id').and.be.equal(''+credentials.admin._id);
              submittedFormId = res.body._id;
              submittedFormFirstName = res.body.firstName;
              submittedFormLastName = res.body.lastName;
              submittedFormEmail = res.body.patientEmail;
              done();
            });
        });
      });

      describe('GET /api/form/:form_id', function(){
        it('should respond with submitted form data', function(done){
          request(url)
            .get('/api/form/visitorList/' + submittedFormId)
            .query({email: credentials.email, token: credentials.token, isAdmin:true})
            .end(function(err, res){
              res.body.should.have.property('_id');
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('patientEmail');
              res.body.should.have.property('_admin_id');
              res.body.should.have.property('date');
              res.body.should.have.property('form').and.be.instanceof(Object);

              res.body.form.should.deep.equal(submittedForm);
              res.body._id.should.equal(submittedFormId);
              done();
            });
        });
      });

      describe('GET /api/form/', function(){
        it('should respond with submitted form data', function(done){
          request(url)
            .get('/api/form/visitorList/')
            .query({firstName: submittedFormFirstName, lastName: submittedFormLastName, patientEmail: submittedFormEmail})
            .end(function(err,res){
              
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('patientEmail');
              res.body.should.have.property('_admin_id');
              res.body.should.have.property('date');
              res.body.should.have.property('form').and.be.instanceof(Object);

              res.body.form.should.deep.equal(submittedForm);
              res.body.patientEmail.should.equal(submittedFormEmail);
              res.body.firstName.should.equal(submittedFormFirstName);
              res.body.lastName.should.equal(submittedFormLastName);
              done();
            });
        });
      });

    });

      
    

    after(function(done) {
      ConfigureAuth.cleanupAuth(credentials.email, done);
    });

  }
);
