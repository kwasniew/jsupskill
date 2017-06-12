var eq = require('../../src/eq');


test.skip('Type(x) is the same as Type(y)', function () {
    expect(5 == 5).toBeTruthy();
    expect(eq(5, 5)).toBeTruthy();
});

test.skip('If x is null and y is undefined, return true', function () {
    expect(null == undefined).toBeTruthy();
    expect(eq(null, undefined)).toBeTruthy();
});

test.skip('If x is undefined and y is null, return true.', function () {
    expect(undefined == null).toBeTruthy();
    expect(eq(undefined, null)).toBeTruthy();
});

test.skip('If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).', function () {
    expect(1 == '1').toBeTruthy();
    expect(1 != '2').toBeTruthy();

    expect(eq(1, '1')).toBeTruthy();
    expect(!eq(1, '2')).toBeTruthy();
});

test.skip('If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.', function () {
    expect('1' == 1).toBeTruthy();
    expect('1' != 2).toBeTruthy();

    expect(eq('1', 1)).toBeTruthy();
    expect(!eq('1', 2)).toBeTruthy();
});

test.skip('If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.', function () {
    expect(true == 1).toBeTruthy();
    expect(false == 0).toBeTruthy();

    expect(eq(true, 1)).toBeTruthy();
    expect(eq(false, 0)).toBeTruthy();
});

test.skip('If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).', function () {
    expect(1 == true).toBeTruthy();
    expect(0 == false).toBeTruthy();

    expect(eq(1, true)).toBeTruthy();
    expect(eq(0, false)).toBeTruthy();
});

test.skip('If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).', function () {
    var o4 = {
        valueOf: function (assert) {
            return 1;
        }
    };
    var o5 = {
        toString: function (assert) {
            return 'value';
        }
    };
    var o6 = {
        valueOf: function (assert) {
            return 0;
        },
        toString: function (assert) {
            return 'value';
        }
    };
    var o7 = {
        valueOf: function (assert) {
            return '1';
        },
        toString: function (assert) {
            return '0';
        }
    };

    expect(1 == o4).toBeTruthy();
    expect('value' == o5).toBeTruthy();
    expect(0 == o6).toBeTruthy();
    expect(1 == o7).toBeTruthy();

    expect(eq(1, o4)).toBeTruthy();
    expect(eq('value', o5)).toBeTruthy();
    expect(eq(0, o6)).toBeTruthy();
    expect(eq(1, o7)).toBeTruthy();
});

test.skip('If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.', function () {
    var o4 = {
        valueOf() {
            return 1;
        }
    };
    var o5 = {
        toString() {
            return 'value';
        }
    };
    var o6 = {
        valueOf() {
            return 0;
        },
        toString() {
            return 'value';
        }
    };
    var o7 = {
        valueOf() {
            return '1';
        },
        toString() {
            return '0';
        }
    };

    expect(o4 == 1).toBeTruthy();
    expect(o5 == 'value').toBeTruthy();
    expect(o6 == 0).toBeTruthy();
    expect(o7 == 1).toBeTruthy();

    expect(eq(o4, 1)).toBeTruthy();
    expect(eq(o5, 'value')).toBeTruthy();
    expect(eq(o6, 0)).toBeTruthy();
    expect(eq(o7, 1)).toBeTruthy();
});

test.skip('default false', function () {
    expect({} != undefined).toBeTruthy();

    expect(!eq({}, undefined)).toBeTruthy();
});

test.skip('WTF compliance check', function () {
    expect(!eq('123', true)).toBeTruthy();
    expect(eq([], false)).toBeTruthy();

    // https://www.youtube.com/watch?v=et8xNAc2ic8
    // WTFJS
    expect(!![] === true).toBeTruthy();
    expect(eq([], false)).toBeTruthy();
    expect(!eq(null, false)).toBeTruthy();
    expect(eq(0, '0')).toBeTruthy();
    expect(!eq([], [])).toBeTruthy();
    expect(eq([], ![])).toBeTruthy();
    expect(eq(2, [2])).toBeTruthy();
});

// don't memorize those
// don't ask about them in job interviews
test.skip('some worst offenders', function () {
    expect(!eq('0', null)).toBeTruthy(); // null can only coercively equal to undefined
    expect(!eq('0', undefined)).toBeTruthy();
    expect(eq('0', false)).toBeTruthy(); // gotcha
    expect(!eq('0', NaN)).toBeTruthy();
    expect(eq('0', 0)).toBeTruthy();
    expect(!eq('0', '')).toBeTruthy();

    expect(!eq(false, null)).toBeTruthy();
    expect(!eq(false, undefined)).toBeTruthy();
    expect(!eq(false, NaN)).toBeTruthy();
    expect(eq(false, 0)).toBeTruthy();
    expect(eq(false, '')).toBeTruthy();
    expect(eq(false, [])).toBeTruthy();
    expect(!eq(false, {})).toBeTruthy(); // weird compared to the previous

    expect(!eq('', null)).toBeTruthy();
    expect(!eq('', undefined)).toBeTruthy();
    expect(!eq('', NaN)).toBeTruthy();
    expect(eq('', 0)).toBeTruthy();
    expect(eq('', [])).toBeTruthy();
    expect(!eq('', {})).toBeTruthy();

    expect(!eq(0, null)).toBeTruthy();
    expect(!eq(0, undefined)).toBeTruthy();
    expect(!eq(0, NaN)).toBeTruthy();
    expect(eq(0, [])).toBeTruthy();
    expect(!eq(0, {})).toBeTruthy();
});

test.skip('safe parts', function () {
    expect(!eq(42, '43')).toBeTruthy();
    expect(!eq(42, 'foo')).toBeTruthy();
    expect(!eq(true, 'true')).toBeTruthy();

    expect(eq(42, '42')).toBeTruthy();
    expect(eq(['foo'], 'foo')).toBeTruthy();
});
