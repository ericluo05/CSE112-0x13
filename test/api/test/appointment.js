/**
 * Created by kevingu on 2/21/16.
 */
let request = require('supertest');
let config = require('../../../server/config/config');
let Appointment = require('../../../server/models/Appointment');
let Company = require('../../../server/models/Company');
let chai = require('chai');
let should = chai.should();

describe('Appointment Test', function() {
    let url = 'localhost:' + config.port;
    // let token;
    let currAppointment;
    let currCompany;

    // old appointment info
    let firstName = 'test';
    let lastName = 'test';
    let phoneNumber='1234567890';
    let date='2016-04-23T18:25:43.511Z';
    let providerName = 'test test';

    // new appointment info
    let newFirstName = 'test1';
    let newLastName = 'test1'; ;
    let newPhoneNumber='1231267890';
    let newDate='2016-03-23T18:25:43.511Z';
    let newProviderName = 'test1 test1';

    // company info
    let email = 'new@test.edu';
    let creditCardNumber='1231231241251';
    let name = 'test';
    let expirationDate='6/17';
    // var phoneNumber='1234567890';

    // let userID = null;


    before(function(done) {
        // setup company
        let company = new Company();
        company.email = email;
        company.credit_card_number = creditCardNumber;
        company.name = name;
        company.expiration_date = expirationDate;
        company.phone_number = phoneNumber;
        company.paid_time=new Date();

        company.save(function(err, c) {
            currCompany=c;
            request(url)
                .post('/api/appointments')
                .send(
                    {
                        first_name: firstName,
                        last_name: lastName,
                        phone_number: phoneNumber,
                        date: date,
                        company_id: currCompany._id,
                        provider_name: providerName,
                    }
                )
                .expect(200)
                .end(function(err, res) {
                    res.body.should.have.property('_id');
                    currAppointment=res.body;
                    done();
                });
        });
    });


    it('should not create the appointment', function(done) {
        request(url)
            .post('/api/appointments')
            .send(
                {
                    first_name: newFirstName,
                    last_name: newLastName,
                    phone_number: newPhoneNumber,
                    date: newDate,
                    company_id: currCompany._id,
                    provider_name: newProviderName,
                }
            )
            .expect(400)
            .end(function(err, res) {
                res.should.have.property('error');
                done();
            });
    });

    it('should get appointment', function(done) {
        request(url)
            .get('/api/appointments/'+currAppointment._id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('_id');
                done();
            });
    });

    it('should not get appointment', function(done) {
        request(url)
            .get('/api/appointments/'+0)
            .expect(400)
            .end(function(err, res) {
                console.log(res.body);
                res.body.should.have.property('error');
                done();
            });
    });


    it('should get all appointments', function(done) {
        request(url)
            .get('/api/appointments/company/'+currCompany._id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.an.instanceof(Array);
                done();
            });
    });

    it('should update appointment', function(done) {
        request(url)
            .put('/api/appointments/'+currAppointment._id)
            .send(
                {
                    first_name: newFirstName,
                    last_name: newLastName,
                    phone_number: newPhoneNumber,
                    date: newDate,
                    provider_name: newProviderName,
                }
            )
            .expect(200)
            .end(function(err, res) {
                if(err)
                    throw(err);
                res.body.should.have.property('first_name');
                res.body.first_name.should.equal(newFirstName);
                res.body.should.have.property('last_name');
                res.body.last_name.should.equal(newLastName);
                res.body.should.have.property('phone_number');
                res.body.phone_number.should.equal(newPhoneNumber);
                res.body.should.have.property('date');
                res.body.date.should.equal(newDate);
                res.body.should.have.property('provider_name');
                res.body.provider_name.should.equal(newProviderName);
                done();
            });
    });

    it('should delete appointment', function(done) {
        request(url)
            .delete('/api/appointments/'+currAppointment._id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('_id');
                Appointment.find({_id: currAppointment._id},
                  function(err, res) {
                    // console.log('in res');
                    // console.log(res);
                    // console.log('in err');
                    // console.log(err);
                    should.exist(res);
                    done();
                });
            });
    });

    after(function(done) {
        Company.remove({email: email}, function(err, c) {
            done();
        });
    });
});
