var curry = require('../../src/curry');

function sum(a, b, c) {
    return a + b + c;
}

test.skip('f(a,b,c)', function () {
    var sumC = curry(sum);

    expect(sumC(1, 2, 3)).toBe(6);
});

test.skip('f(a,b)(c)', function () {
    var sumC = curry(sum);

    expect(sumC(1, 2)(3)).toBe(6);
});

test.skip('f(a)(b, c)', function () {
    var sumC = curry(sum);

    expect(sumC(1)(2, 3)).toBe(6);
});

test.skip('f(a)(b)(c)', function () {
    var sumC = curry(sum);

    expect(sumC(1)(2)(3)).toBe(6);
});

test.skip('f(a)(b)(c,d,e) with extra args', function () {
    var sumC = curry(sum);

    expect(sumC(1)(2)(3, 4, 5)).toBe(6);
});