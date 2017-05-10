let assert = require('assert');
let foo = require('../../lib/fooAPI');


describe('Foo Tests', function() {
    describe('bar = 5', function() {
        it('returns false', function() {
            assert.equal(false, foo(5));
        });
    });

    describe('bar = bar', function() {
        it('returns false', function() {
            assert.equal(false, foo('bar'));
        });
    });

    describe('bar = baz', function() {
        it('returns true', function() {
            assert.equal(true, foo('baz'));
        });
    });
});


