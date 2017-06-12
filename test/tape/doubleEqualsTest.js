var test = require('tape');
var eq = require('../../src/eq');


test.skip('Type(x) is the same as Type(y)', function (t) {
    t.ok(5 == 5);
    t.ok(eq(5, 5));
    t.end();
});

test.skip('If x is null and y is undefined, return true', function (t) {
    t.ok(null == undefined);
    t.ok(eq(null, undefined));
    t.end();
});

test.skip('If x is undefined and y is null, return true.', function (t) {
    t.ok(undefined == null);
    t.ok(eq(undefined, null), "sdafsafd");
    t.end();
});

test.skip('If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).', function (t) {
    t.ok(1 == '1');
    t.ok(1 != '2');

    t.ok(eq(1, '1'));
    t.ok(!eq(1, '2'));

    t.end();
});

test.skip('If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.', function (t) {
    t.ok('1' == 1);
    t.ok('1' != 2);

    t.ok(eq('1', 1));
    t.ok(!eq('1', 2));

    t.end();
});

test.skip('If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.', function (t) {
    t.ok(true == 1);
    t.ok(false == 0);

    t.ok(eq(true, 1));
    t.ok(eq(false, 0));

    t.end();
});

test.skip('If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).', function (t) {
    t.ok(1 == true);
    t.ok(0 == false);

    t.ok(eq(1, true));
    t.ok(eq(0, false));

    t.end();
});

test.skip('If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).', function (t) {

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

    t.ok(1 == o4);
    t.ok('value' == o5);
    t.ok(0 == o6);
    t.ok(1 == o7);

    t.ok(eq(1, o4));
    t.ok(eq('value', o5));
    t.ok(eq(0, o6));
    t.ok(eq(1, o7));

    t.end();
});

test.skip('If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.', function (t) {
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

    t.ok(o4 == 1);
    t.ok(o5 == 'value');
    t.ok(o6 == 0);
    t.ok(o7 == 1);

    t.ok(eq(o4, 1));
    t.ok(eq(o5, 'value'));
    t.ok(eq(o6, 0));
    t.ok(eq(o7, 1));

    t.end();
});

test.skip('default false', function (t) {
    t.ok({} != undefined);

    t.ok(!eq({}, undefined));

    t.end();
});

test.skip('WTF compliance check', function (t) {
    t.ok(!eq('123', true));
    t.ok(eq([], false));

    // https://www.youtube.com/watch?v=et8xNAc2ic8
    // WTFJS
    t.ok(!![] === true);
    t.ok(eq([], false));
    t.ok(!eq(null, false));
    t.ok(eq(0, '0'));
    t.ok(!eq([], []));
    t.ok(eq([], ![]));
    t.ok(eq(2, [2]));

    t.end();
});

// don't memorize those
// don't ask about them in job interviews
test.skip('some worst offenders', function (t) {
    t.ok(!eq('0', null)); // null can only coercively equal to undefined
    t.ok(!eq('0', undefined));
    t.ok(eq('0', false)); // gotcha
    t.ok(!eq('0', NaN));
    t.ok(eq('0', 0));
    t.ok(!eq('0', ''));

    t.ok(!eq(false, null));
    t.ok(!eq(false, undefined));
    t.ok(!eq(false, NaN));
    t.ok(eq(false, 0));
    t.ok(eq(false, ''));
    t.ok(eq(false, []));
    t.ok(!eq(false, {})); // weird compared to the previous

    t.ok(!eq('', null));
    t.ok(!eq('', undefined));
    t.ok(!eq('', NaN));
    t.ok(eq('', 0));
    t.ok(eq('', []));
    t.ok(!eq('', {}));

    t.ok(!eq(0, null));
    t.ok(!eq(0, undefined));
    t.ok(!eq(0, NaN));
    t.ok(eq(0, []));
    t.ok(!eq(0, {}));

    t.end();
});

test.skip('safe parts', function (t) {
    t.ok(!eq(42, '43'));
    t.ok(!eq(42, 'foo'));
    t.ok(!eq(true, 'true'));

    t.ok(eq(42, '42'));
    t.ok(eq(['foo'], 'foo'));

    t.end();
});
