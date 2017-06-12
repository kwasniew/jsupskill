var assert = require('assert');
var Primitive = require('../../src/toPrimitive');

describe('ToPrimitive', function () {
    it.skip('converts primitive input type', function () {
        assert.strictEqual(Primitive(1), 1);
        assert.strictEqual(Primitive('a'), 'a');
        assert.strictEqual(Primitive(null), null);
    });

    it.skip('converts object with valueOf happy path', function () {
        var o = {
            valueOf: function() {
                return 1;
            },
            toString: function() {
                return '1';
            }
        };

        assert.strictEqual(Primitive(o), 1);
    });

    it.skip('converts object with valueOf unhappy path', function () {
        var o = {
            valueOf: function() {
                return {};
            },
            toString: function() {
                return '1';
            }
        };

        assert.strictEqual(Primitive(o), '1');
    });


    it.skip('fails on inconvertible input', function () {
        var o = {
            toString: function() {
                return {};
            },
            valueOf: function() {
                return {};
            }
        };

        assert.throws(() => {
            Primitive(o);
        }, /input cannot be converted to primitive/);
    });

});