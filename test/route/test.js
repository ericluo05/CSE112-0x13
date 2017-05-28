/* eslint-disable apidoc/rule-name */
let request = require('supertest');
let app = require('../../server/app');

describe('index route', function() {
    it('should respond with a 200 with no query parameters', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});

describe('login route', function() {
    it('should respond with a 200 with no query parameters', function(done) {
        request(app)
            .get('/login')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});

describe('signup route', function() {
    it('should respond with a 200 with no query parameters', function(done) {
        request(app)
            .get('/signup')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});

describe('index route', function() {
    it('should respond with a 200 with no query parameters', function(done) {
        request(app)
            .get('/index')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});
