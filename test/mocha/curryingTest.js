var assert = require('assert');

var curry = require('../../src/curry');

function sum(a, b, c) {
    return a + b + c;
}

describe('currying', function () {
    it('f(a,b,c)', function () {
        var sumC = curry(sum);

        assert.equal(sumC(1, 2, 3), 6);
    });

    it('f(a,b)(c)', function () {
        var sumC = curry(sum);

        assert.equal(sumC(1, 2)(3), 6);
    });

    it('f(a)(b, c)', function () {
        var sumC = curry(sum);

        assert.equal(sumC(1)(2, 3), 6);
    });

    it('f(a)(b)(c)', function () {
        var sumC = curry(sum);

        assert.equal(sumC(1)(2)(3), 6);
    });

    it('f(a)(b)(c,d,e) with extra args', function () {
        var sumC = curry(sum);

        assert.equal(sumC(1)(2)(3, 4, 5), 6);
    });

});