var test = require('tape');

var curry = require('../../src/curry');

function sum(a, b, c) {
    return a + b + c;
}

test.skip('f(a,b,c)', function (t) {
    var sumC = curry(sum);

    t.equal(sumC(1, 2, 3), 6);

    t.end();
});

test.skip('f(a,b)(c)', function (t) {
    var sumC = curry(sum);

    t.equal(sumC(1, 2)(3), 6);

    t.end();
});

test.skip('f(a)(b, c)', function (t) {
    var sumC = curry(sum);

    t.equal(sumC(1)(2, 3), 6);

    t.end();
});

test.skip('f(a)(b)(c)', function (t) {
    var sumC = curry(sum);

    t.equal(sumC(1)(2)(3), 6);

    t.end();
});

test.skip('f(a)(b)(c,d,e) with extra args', function (t) {
    var sumC = curry(sum);

    t.equal(sumC(1)(2)(3, 4, 5), 6);

    t.end();
});