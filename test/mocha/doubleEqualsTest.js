var assert = require('assert');
var eq = require('../../src/eq');

describe('== abstract equality comparison', function () {
    it.skip('Type(x) is the same as Type(y)', function () {
        assert.ok(5 == 5);
        assert.ok(eq(5, 5));
    });

    it.skip('If x is null and y is undefined, return true', function () {
        assert.ok(null == undefined);
        assert.ok(eq(null, undefined));
    });

    it.skip('If x is undefined and y is null, return true.', function () {
        assert.ok(undefined == null);
        assert.ok(eq(undefined, null));
    });

    it.skip('If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).', function () {
        assert.ok(1 == '1');
        assert.ok(1 != '2');

        assert.ok(eq(1, '1'));
        assert.ok(!eq(1, '2'));
    });

    it.skip('If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.', function () {
        assert.ok('1' == 1);
        assert.ok('1' != 2);

        assert.ok(eq('1', 1));
        assert.ok(!eq('1', 2));
    });

    it.skip('If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.', function () {
        assert.ok(true == 1);
        assert.ok(false == 0);

        assert.ok(eq(true, 1));
        assert.ok(eq(false, 0));
    });

    it.skip('If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).', function () {
        assert.ok(1 == true);
        assert.ok(0 == false);

        assert.ok(eq(1, true));
        assert.ok(eq(0, false));
    });

    it.skip('If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).', function () {

        var o4 = {
            valueOf: function () {
                return 1;
            }
        };
        var o5 = {
            toString: function () {
                return 'value';
            }
        };
        var o6 = {
            valueOf: function () {
                return 0;
            },
            toString: function () {
                return 'value';
            }
        };
        var o7 = {
            valueOf: function () {
                return '1';
            },
            toString: function () {
                return '0';
            }
        };

        assert.ok(1 == o4);
        assert.ok('value' == o5);
        assert.ok(0 == o6);
        assert.ok(1 == o7);

        assert.ok(eq(1, o4));
        assert.ok(eq('value', o5));
        assert.ok(eq(0, o6));
        assert.ok(eq(1, o7));
    });

    it.skip('If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.', function () {
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

        assert.ok(o4 == 1);
        assert.ok(o5 == 'value');
        assert.ok(o6 == 0);
        assert.ok(o7 == 1);

        assert.ok(eq(o4, 1));
        assert.ok(eq(o5, 'value'));
        assert.ok(eq(o6, 0));
        assert.ok(eq(o7, 1));
    });

    it.skip('default false', function () {
        assert.ok({} != undefined);

        assert.ok(!eq({}, undefined));
    });

    it.skip('WTF compliance check', function () {
        assert.ok(!eq('123', true));
        assert.ok(eq([], false));

        // https://www.youtube.com/watch?v=et8xNAc2ic8
        // WTFJS
        assert.ok(!![] === true);
        assert.ok(eq([], false));
        assert.ok(!eq(null, false));
        assert.ok(eq(0, '0'));
        assert.ok(!eq([], []));
        assert.ok(eq([], ![]));
        assert.ok(eq(2, [2]));
    });

    // don't memorize those
    // don't ask about them in job interviews
    it.skip('some worst offenders', function () {
        assert.ok(!eq('0', null)); // null can only coercively equal to undefined
        assert.ok(!eq('0', undefined));
        assert.ok(eq('0', false)); // gotcha
        assert.ok(!eq('0', NaN));
        assert.ok(eq('0', 0));
        assert.ok(!eq('0', ''));

        assert.ok(!eq(false, null));
        assert.ok(!eq(false, undefined));
        assert.ok(!eq(false, NaN));
        assert.ok(eq(false, 0));
        assert.ok(eq(false, ''));
        assert.ok(eq(false, []));
        assert.ok(!eq(false, {})); // weird compared to the previous

        assert.ok(!eq('', null));
        assert.ok(!eq('', undefined));
        assert.ok(!eq('', NaN));
        assert.ok(eq('', 0));
        assert.ok(eq('', []));
        assert.ok(!eq('', {}));

        assert.ok(!eq(0, null));
        assert.ok(!eq(0, undefined));
        assert.ok(!eq(0, NaN));
        assert.ok(eq(0, []));
        assert.ok(!eq(0, {}));
    });

    it.skip('safe parts', function () {
        assert.ok(!eq(42, '43'));
        assert.ok(!eq(42, 'foo'));
        assert.ok(!eq(true, 'true'));

        assert.ok(eq(42, '42'));
        assert.ok(eq(['foo'], 'foo'));
    });
});

