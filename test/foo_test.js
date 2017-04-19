var assert = require('assert');
var request = require('request');
var foo = require('../routes/foo')

//Note that the response is in the format of "text/plain"
//with the body with the string "true" / "false"

describe('Foo Tests', function() {
    describe('URL Requests For bar = 5', function() {
        var url = "https://team0x13.herokuapp.com/foo?bar=5";

        it('returns status 200', function() {
            request(url, function(error, response, body){
                assert.equal(response.statusCode,200);
            });
        });

        it('return false for non string input', function() {
            request(url, function(error, response, body){
                assert.equal(response.body, 'false\n');
            });
        });
    });

    describe('URL Requests For bar = "foo"', function() {
        var url = "https://team0x13.herokuapp.com/foo?bar=foo";

        it('returns status 200', function() {
            request(url, function(error, response, body){
                assert.equal(response.statusCode,200);
            });
        });

        it('return false', function() {
            request(url, function(error, response, body){
                assert.equal(response.body, 'false\n');
            });
        });
    });

    describe('URL Requests For bar = "baz"', function() {
        var url = "https://team0x13.herokuapp.com/foo?bar=baz";

        it('returns status 200', function() {
            request(url, function(error, response, body){
                assert.equal(response.statusCode,200);
            });
        });

        it('return true', function() {
            request(url, function(error, response, body){
                assert.equal(response.body, 'true\n');
            });
        });
    });

});
