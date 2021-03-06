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
