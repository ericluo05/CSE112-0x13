var assert = require('assert');
var request = require('request');
var foo = require('../routes/foo');


describe('Foo Tests', function() {
    describe('bar = 5', function() {
        it('returns false', function() {
            assert.equal(false, foo.foo(5));
        });
        
    });
    
    describe('bar = bar', function() {
        it('returns bar', function() {
            assert.equal(false, foo.foo('bar'));
        });
        
    });
    
    describe('bar = baz', function() {
        it('returns true', function() {
            assert.equal(true, foo.foo('baz'));
        });
        
    });
});


