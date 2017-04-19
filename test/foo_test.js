var assert = require('assert');
var request = require('request');
var foo = require('../calls/fooAPI');


describe('Foo Tests', function() {
    describe('bar = 5', function() {
        it('returns false', function() {
            assert.equal(false, foo.foo(5));
        });
        
    });
    
    describe('bar = bar', function() {
        it('returns false', function() {
            assert.equal(false, foo.foo('bar'));
        });
        
    });
    
    describe('bar = baz', function() {
        it('returns true', function() {
            assert.equal(true, foo.foo('baz'));
        });
        
    });
});


