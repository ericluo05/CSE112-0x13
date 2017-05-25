/* eslint-disable no-invalid-this */

let request = require('supertest');

let config = require('../../../server/config/config');
let Company = require('../../../server/models/Company');
let Appointment = require('../../../server/models/Appointment');
let VisitorList = require('../../../server/models/VisitorList');
let should = require('chai').should();

describe('VisitorList', function() {
    let url = 'localhost:' + config.port;

    let currCompany;
    let currVisitorList;
    let appointment1;
    let appointment2;
    let visitor1;

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date();
    tomorrow = tomorrow.setDate(today.getDate()+2);

    // info for the company
    let companyInfo = {
        email: 'test@test.edu',
        credit_card_number: '1231231241251',
        name: 'test',
        expiration_date: '6/17',
        phone_number: '1234567890',
        paid_time: new Date(),
    };

    // info for first visitor
    let firstVisitorInfo = {
        first_name: 'test1',
        last_name: 'test1',
        phone_number: '1234567890',
        checkin_time: new Date(),
        additional_info: {
            allergies: 'peanuts',
        },
    };

    // info for second visitor
    let secondVisitorInfo = {
        first_name: 'test2',
        last_name: 'test2',
        phone_number: '1234567890',
        checkin_time: new Date(),
        additional_info: {
            allergies: 'seafood',
        },
    };

    // info for visitor_one's appointment
    let firstAppointmentInfo = {
        first_name: firstVisitorInfo.first_name,
        last_name: firstVisitorInfo.last_name,
        phone_number: firstVisitorInfo.phone_number,
        date: new Date(),
        provider_name: 'provider1',
    };

    // info for visitor_two's appointment
    let secondAppointmentInfo = {
        first_name: secondVisitorInfo.first_name,
        last_name: secondVisitorInfo.last_name,
        phone_number: secondVisitorInfo.phone_number,
        date: tomorrow,
        provider_name: 'provider2',
    };

    before(function(done) {
        currCompany = new Company();
        currCompany.email = companyInfo.email;
        currCompany.credit_card_number = companyInfo.credit_card_number;
        currCompany.name = companyInfo.name;
        currCompany.expiration_date = companyInfo.expiration_date;
        currCompany.phone_number = companyInfo.phone_number;
        currCompany.paid_time = companyInfo.paid_time;
        currCompany.save(function(err, c) {
            if(err) throw(err);
            currCompany = c;
            appointment1 = new Appointment();
            appointment1.first_name = firstAppointmentInfo.first_name;
            appointment1.last_name = firstAppointmentInfo.last_name;
            appointment1.phone_number = firstAppointmentInfo.phone_number;
            appointment1.date = firstAppointmentInfo.date;
            appointment1.company_id = c._id;
            appointment1.provider_name = firstAppointmentInfo.provider_name;
            appointment1.save(function(err, a1) {
                console.log(err);
                if(err) throw(err);
                appointment1=a1;
                appointment2 = new Appointment();
                appointment2.first_name = secondAppointmentInfo.first_name;
                appointment2.last_name = secondAppointmentInfo.last_name;
                appointment2.phone_number =
                  secondAppointmentInfo.phone_number;
                appointment2.date = secondAppointmentInfo.date;
                appointment2.company_id = c._id;
                appointment2.provider_name =
                  secondAppointmentInfo.provider_name;
                appointment2.save(function(err, a2) {
                    if(err) throw(err);
                    appointment2=a2;
                    done();
                });
            });
        });
    });


    it('should add vistitors to list', function(done) {
      request(url)
        .post('/api/visitorLists')
        .send({
            company_id: currCompany._id,
            first_name: firstVisitorInfo.first_name,
            last_name: firstVisitorInfo.last_name,
            phone_number: firstVisitorInfo.phone_number,
            checkin_time: firstVisitorInfo.checkin_time,
            additional_info: firstVisitorInfo.additional_info,
        })
        .expect(200)
        .end(function(err, res) {
            if(err) throw(err);
            res.body.should.have.property('_id');
            res.body.should.have.property('visitors');
            let visitors = res.body.visitors;
            visitors.should.have.length.of(1);
            visitor1 = visitors[0];

            visitor1.should.have.property('_id');
            visitor1.should.have.property('company_id');
            visitor1.should.have.property('first_name');
            visitor1.should.have.property('last_name');
            visitor1.should.have.property('phone_number');
            visitor1.should.have.property('checkin_time');

            visitor1.should.have.property('appointments');
            visitor1.appointments.should.be.an.instanceof(Array);
            visitor1.appointments.should.have.length.of(1);

            visitor1.should.have.property('additional_info');
            visitor1.additional_info.should.have.property('allergies');


            currVisitorList=res.body;
            // adding second visitor
            request(url)
                .post('/api/visitorLists')
                .send({
                    company_id: currCompany._id,
                    first_name: secondVisitorInfo.first_name,
                    last_name: secondVisitorInfo.last_name,
                    phone_number: secondVisitorInfo.phone_number,
                    checkin_time: secondVisitorInfo.checkin_time,
                    additional_info: secondVisitorInfo.additional_info,
                })
                .expect(200)
                .end(function(err, res) {
                    if(err) throw(err);
                    let visitors = res.body.visitors;
                    visitors.should.have.length.of(2);
                    let visitor2 = visitors[0];
                    visitor2.should.have.property('appointments');
                    visitor2.appointments.should.be.an.instanceof(Array);
                    visitor2.appointments.should.have.length.of(1);
                    done();
                });
        });
    });


    it('should get visitor list', function(done) {
        this.timeout(8000);
        request(url)
            .get('/api/visitorLists/company/'+currCompany._id)
            .send()
            .expect(200)
            .end(function(err, res) {
                should.exist(res.body.visitors);
                res.body.visitors.should.be.an.instanceof(Array);
                res.body.visitors.should.have.length.of(2);
                done();
            });
    });

    it('should not get visitor list', function(done) {
        this.timeout(8000);
        request(url)
            .get('/api/visitorLists/company/0')
            .send()
            .expect(404)
            .end(function(err, res) {
                console.log(res.body);
                res.body.should.have.property('error');
                done();
            });
    });

    it('should delete specified Visitor', function(done) {
        request(url)
            .get('/api/visitorLists/company/'+currCompany._id)
            .end(function(err, res) {
                let prevLen=0;
                // let patientId;
                res.body.should.have.property('visitors');
                res.body.visitors.should.be.an.instanceof(Array);
                for(let i=0; i< res.body.visitors.length; i++) {
                    prevLen++;
                    patientId=res.body.visitors[i]._id;
                }
                request(url)
                    .delete('/api/visitorLists/company/'+currCompany._id
                        +'/visitor/'+visitor1._id)
                    .expect(200)
                    .end(function(err, res) {
                        should.exist(res.body);
                        res.body.visitors.should.be.an.instanceof(Array);
                        res.body.visitors.should.have.length.of(prevLen-1);
                        done();
                    });
            });
    });

    it('should clear visitorLists', function(done) {
        this.timeout(8000);
        request(url)
            .delete('/api/visitorLists/'+currVisitorList._id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('visitors');
                res.body.visitors.should.have.length.of(0);
                done();
            });
    });


    after(function(done) {
        Appointment.remove({_id: appointment1._id}, function(err, _) {
           if(err) throw(err);
            Appointment.remove({_id: appointment2._id}, function(err, _) {
                if(err) throw(err);
                Company.remove({_id: currCompany._id}, function(err, _) {
                    if(err) throw(err);
                    // done();
                    VisitorList.remove({_id: currVisitorList._id},
                      function(err, _) {
                        if(err) throw(err);
                        done();
                    });
                });
            });
        });
    });
  }
);
