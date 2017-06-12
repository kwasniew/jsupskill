var Primitive = require('../../src/toPrimitive');

test.skip('converts primitive input type', function () {
    expect(Primitive(1)).toBe(1);
    expect(Primitive('a')).toBe('a');
    expect(Primitive(null)).toBe(null);
});

test.skip('converts object with valueOf happy path', function () {
    var o = {
        valueOf: function() {
            return 1;
        },
        toString: function() {
            return '1';
        }
    };

    expect(Primitive(o)).toBe(1);
});

test.skip('converts object with valueOf unhappy path', function () {
    var o = {
        valueOf: function() {
            return {};
        },
        toString: function() {
            return '1';
        }
    };

    expect(Primitive(o)).toBe('1');
});


test.skip('fails on inconvertible input', function () {
    var o = {
        toString: function() {
            return {};
        },
        valueOf: function() {
            return {};
        }
    };

    expect(() => {
        Primitive(o);
    }).toThrowError(/input cannot be converted to primitive/);
});