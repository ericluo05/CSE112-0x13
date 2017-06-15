let request = require('supertest');

let config = require('../../server/config/config');
let should = require('chai').should();

// Wrapper that creates admin user to allow api calls
let ConfigureAuth = require('./ConfigureAuth');


describe('Employee', function() {
  let url = 'localhost:' + config.port;

  // variable to hold all the need authentication variables.
  let credentials;

  // before function is called at the very beginning of the 'Forms' test suite,
  // no tests are run until the done() callback is called.
  before(function(done) {
    // setupAdmin will create and admin and log you in,
    // give it a callback that will give you
    // the credentials you need. Make sure to call done()
    // inside ConfigureAuth's callback!
    ConfigureAuth.setupAdmin(function(cred) {
      credentials = cred;
      done();
    });
  });

  // let templateFormId = null;


  describe('Employee Testing', function() {
    // TEST POST
    describe('POST /api/employees', function() {
      it('should save submitted employee', function(done) {
        request(url)
        .post('/api/employees')
        .query({email: credentials.email, token: credentials.token})
        .send({
          company_id: credentials.admin._id,
          first_name: 'John',
          last_name: 'Smith',
          email: 'jt@tomcruise.com',
          phone_number: '123456789',
          role: 'c_admin',
          password: 'test',
        })
        .end(function(err, res) {
          if(err)
          throw(err);
          res.body.should.have.property('first_name').and.be.equal('John');
          res.body.should.have.property('email')
            .and.be.equal('jt@tomcruise.com');
          res.body.should.not.have.property('password');
          returnedId = res.body._id;
          done();
        });
      });
    });
    describe('Login', function() {
      it('Should login with employee data', function(done) {
        request(url)
        .post('/api/employees/login')
        .send(
          {
            email: 'jt@tomcruise.com',
            password: 'test',
          }
        )
        .end(function(err, res) {
          if(err) throw (err);
          res.body.should.have.property('_id');
          res.body.should.not.have.property('password');
          done();
        });
      });
      it('Should not login with employee data', function(done) {
        request(url)
        .post('/api/employees/login')
        .send(
          {
            email: 'jt@tomcruise.com',
            password: 'incorrect',
          }
        )
        .end(function(err, res) {
          if(err) throw (err);
          res.body.should.have.property('error');

          done();
        });
      });
      it('Should update the employee data', function(done) {
        request(url)
        .put('/api/employees/' + returnedId)
        .query({email: credentials.email, token: credentials.token})
        .send({
          _admin_id: credentials.admin._id,
          password: 'new_password',
        })
        .end(function(err, res) {
          if(err)
          throw(err);

          res.body.should.have.property('email');
          res.body.should.have.property('phone_number');
          res.body.should.not.have.property('password');
          done();
        });
      });
      /* For security purpose
      it('Should login with new password', function(done) {
        request(url)
        .post('/api/employees/login')
        .send(
          {
            email: 'jt@tomcruise.com',
            password: 'new_password',
          }
        )
        .end(function(err, res) {
          if(err) throw (err);
          res.body.should.have.property('email');
          res.body.should.have.property('phone_number');
          res.body.should.not.have.property('password');
          done();
        });
      });*/
    });

    // Test update employee data not able to update password
    describe('', function() {
      it('Should not update employee password through update api', function(done) {
        request(url)
        .put('/api/employees/' + returnedId)
        // .query({email: credentials.email, token: credentials.token})
        .send({
          id: returnedId,
          currentpwd: 'test',
          newpwd: 'notreachable',
        })
        .expect(200)
        .end(function(err, res) {
          // console.log(res.body);
          done();
        });
      });
    });


    // Test employee password change
    describe('POST /api/employees/pwdchange/:id', function() {
      it('Should update employee password', function(done) {
        request(url)
        .post('/api/employees/pwdchange/' + returnedId)
        .send({
          id: returnedId,
          currentpwd: 'test',
          newpwd: 'badpwd',
        })
        .expect(200)
        .end(function(err, res) {
          if (err)
            throw (err);
          res.body.should.have.property('_id').and.be.equal(returnedId);
          res.body.should.have.property('role').and.be.equal('c_admin');
          res.body.should.have.property('company_id');
          res.body.should.have.property('phone_number').and.be.equal('123456789');
          res.body.should.have.property('email').and.be.equal('jt@tomcruise.com');
          res.body.should.have.property('last_name').and.be.equal('Smith');
          res.body.should.have.property('first_name').and.be.equal('John');
          res.body.should.have.property('receive_email');
          res.body.should.have.property('receive_sms');
          done();
        });
      });

      it('Should revert update to employee password', function(done) {
        request(url)
        .post('/api/employees/pwdchange/' + returnedId)
        .send({
          id: returnedId,
          currentpwd: 'badpwd',
          newpwd: 'test',
        })
        .expect(200)
        .end(function(err, res) {
          if (err)
            throw (err);
          res.body.should.have.property('_id').and.be.equal(returnedId);
          res.body.should.have.property('role').and.be.equal('c_admin');
          res.body.should.have.property('company_id');
          res.body.should.have.property('phone_number').and.be.equal('123456789');
          res.body.should.have.property('email').and.be.equal('jt@tomcruise.com');
          res.body.should.have.property('last_name').and.be.equal('Smith');
          res.body.should.have.property('first_name').and.be.equal('John');
          res.body.should.have.property('receive_email');
          res.body.should.have.property('receive_sms');
          done();
        });
      });
    });

    // TEST PUT
    describe('PUT /api/employee/:id', function() {
      it('Should update the employee data', function(done) {
        request(url)
        .put('/api/employees/' + returnedId)
        .query({email: credentials.email, token: credentials.token})
        .send({
          _admin_id: credentials.admin._id,
          email: 'updated_email@tomcruise.com',
          phone_number: '987654321',
        })
        .end(function(err, res) {
          if(err)
          throw(err);

          res.body.should.have.property('email')
            .and.be.equal('updated_email@tomcruise.com');
          res.body.should.have.property('phone_number')
            .and.be.equal('987654321');
          res.body.should.not.have.property('password');
          done();
        });
      });
    });

    // TEST GET ALL EMPLOYEES
    describe('GET /api/employees/company/:id', function() {
      it('should return all employees', function(done) {
        request(url)
        .get('/api/employees/company/'+credentials.admin._id)
        .send({
          _admin_id: credentials.admin._id,
        })
        .end(function(err, res) {
          // console.log("RESPONSE", res)
          res.body.should.be.instanceof(Object);
          res.body.should.not.be.empty;
          // res.body.should.not.be.empty();
          should.exist(res.body);
          // res.body.should.exist;
          should.exist(res.body);
          res.body.should.have.length.of(1);
          res.body.should.be.an.instanceof(Array);
          res.body[0].should.not.have.property('password');
          done();
        });
      });
    });

    // TEST GET A SPECIFIC EMPLOYEE
    describe('GET /api/employees/:id', function() {
      it('should return a specific employee', function(done) {
        request(url)
        .get('/api/employees/' + returnedId)
        .query({email: credentials.email, token: credentials.token})
        .end(function(err, res) {
          res.body.should.have.property('_id');
          res.body.should.have.property('email');
          res.body.should.have.property('first_name');
          res.body.should.have.property('last_name');
          res.body.should.have.property('phone_number');
          res.body.should.not.have.property('password');
          res.body.should.be.instanceof(Object);

          res.body._id.should.equal(returnedId);
          done();
        });
      });
    });

    // TEST RESET PASSWORD
    describe('POST /api/employees/resetPassword', function() {
      it('should return 400 error', function(done) {
        request(url)
        .post('/api/employees/resetPassword')
        .send({
          email: 'invalidemail',
        })
        .expect(400)
        .end(function(err, res) {
          res.body.should.have.property('error').and.be.equal('Can not find');
          done();
        });
      });

      it('should reset password', function(done) {
        request(url)
        .post('/api/employees/resetPassword')
        .send({
          email: 'updated_email@tomcruise.com',
        })
        .expect(200)
        .end(function(err, res) {
          res.body.should.have.property('_id').and.be.equal(returnedId);
          res.body.should.have.property('role').and.be.equal('c_admin');
          res.body.should.have.property('company_id');
          res.body.should.have.property('phone_number').and.be
            .equal('987654321');
          res.body.should.have.property('email').and.be
            .equal('updated_email@tomcruise.com');
          res.body.should.have.property('last_name').and.be.equal('Smith');
          res.body.should.have.property('first_name').and.be.equal('John');
          res.body.should.have.property('receive_email');
          res.body.should.have.property('receive_sms');
          done();
        });
      });
    });

    // TEST DELETE
    describe('DELETE /api/employees/:id', function() {
      it('Should delete the employee data', function(done) {
        request(url)
        .delete('/api/employees/' + returnedId)
        .query({email: credentials.email, token: credentials.token})
        .end(function(err, res) {
          res.body.should.have.property('_id');
          res.body.should.not.have.property('password');
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
