let request = require('supertest');
let config = require('../../../server/config/config');
let Company = require('../../../server/models/Company');
let chai = require('chai');
let should = chai.should();

describe('Company Test', function() {
    let url = 'localhost:' + config.port;
    //let token;
    let currCompany;

    let email = 'test@test.edu';
    let name = 'test';
    let expirationDate='6/17';
    let phoneNumber='1234567890';

    let newEmail = 'test1@test.edu'; ;
    let newName = 'test1';
    //let newExpirationDate='3/19';
    let newPhoneNumber='1231267890';


      //let userID = null;


    before(function(done) {
        request(url)
            .post('/api/companies')
            .send({
                'email': email,
                'name': name,
                'phone_number': phoneNumber,
            })
            .expect(200)
            .end(function(err, res) {
                if(err)
                    throw(err);
                res.body.should.have.property('_id');
                currCompany=res.body;
                done();
            });
    });


    it('should not create the company', function(done) {
        request(url)
            .post('/api/companies')
            .send(
                {
                    email: email,
                    name: name,
                    expiration_date: expirationDate,
                    phone_number: phoneNumber,
                })
            .expect(400)
            .end(function(err, res) {
                res.should.have.property('error');
                done();
            });
    });

    it('should get company', function(done) {
        request(url)
            .get('/api/companies/'+currCompany._id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('_id');
                done();
            });
    });

    it('should not get company', function(done) {
        request(url)
            .get('/api/companies/'+0)
            .expect(400)
            .end(function(err, res) {
                console.log(res.body);
                res.body.should.have.property('error');
                done();
            });
    });


    it('should get all companies', function(done) {
        request(url)
            .get('/api/companies')
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.an.instanceof(Array);
                res.body.should.have.length.of.at.least(1);
                done();
            });
    });

    it('should update company', function(done) {
        request(url)
            .put('/api/companies/'+currCompany._id)
            .send(
                {
                    email: newEmail,
                    name: newName,
                    phone_number: newPhoneNumber,
                }
            )
            .expect(200)
            .end(function(err, res) {
                if(err)
                    throw(err);
                res.body.should.have.property('email');
                res.body.email.should.equal(newEmail);
                res.body.should.have.property('name');
                res.body.name.should.equal(newName);
                res.body.should.have.property('phone_number');
                res.body.phone_number.should.equal(newPhoneNumber);
                done();
            });
    });

    it('should delete company', function(done) {
        request(url)
            .delete('/api/companies/'+currCompany._id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('_id');
                Company.find({_id: currCompany._id}, function(err, _) {
                    should.exist(res);
                    done();
                });
            });
    });

    after(function(done) {
        done();
    });
});
