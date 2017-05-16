let request = require('supertest');
let config = require('../../../server/config/config');
let Company = require('../../../server/models/Company');
let chai = require('chai');
let should = chai.should();

describe('Company Test', function() {
    let url = 'localhost:' + config.port;
    let token;
    let currCompany;

    let email = 'test@test.edu';
    let name = 'test';
    let expiration_date='6/17';
    let phone_number='1234567890';

    let new_email = 'test1@test.edu'; ;
    let new_name = 'test1';
    let new_expiration_date='3/19';
    let new_phone_number='1231267890';


      let userID = null;


    before(function(done) {
        request(url)
            .post('/api/companies')
            .send({
                'email': email,
                'name': name,
                'phone_number': phone_number,
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
                    expiration_date: expiration_date,
                    phone_number: phone_number,
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
                    email: new_email,
                    name: new_name,
                    phone_number: new_phone_number,
                }
            )
            .expect(200)
            .end(function(err, res) {
                if(err)
                    throw(err);
                res.body.should.have.property('email');
                res.body.email.should.equal(new_email);
                res.body.should.have.property('name');
                res.body.name.should.equal(new_name);
                res.body.should.have.property('phone_number');
                res.body.phone_number.should.equal(new_phone_number);
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
