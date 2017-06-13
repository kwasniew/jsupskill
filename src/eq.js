var Primitive = require('./toPrimitive');
var isObject = require('./isObject');

module.exports = function eq(x, y) {
    // ===
    // 1 == 1
    // Goo metaphore: === w/o coercion,
    // == with coercion
    if (typeof x === typeof y) {
        return x === y;
    }

    // null/undefined normalized
    // x == null
    if (x === null && y === undefined) {
        return true;
    }

    if (x === undefined && y === null) {
        return true;
    }

    // number == Number(string)
    // 1 == '1'
    if (typeof x === 'number' && typeof y === 'string') {
        return eq(x, Number(y));
    }

    if (typeof x === 'string' && typeof y === 'number') {
        return eq(Number(x), y);
    }

    // anything == Number(boolean)
    // 1 == true
    if (typeof x === 'boolean') {
        return eq(Number(x), y);
    }

    if (typeof y === 'boolean') {
        return eq(x, Number(y));
    }

    // string|number == ToPrimitive(object)
    // 1 == {}
    if ((typeof x === 'string' ||
        typeof x === 'number' ||
        typeof x === 'symbol') &&
        isObject(y)) {
        return eq(x, Primitive(y));
    }

    if (isObject(x) &&
        (typeof y === 'string' ||
        typeof y === 'number' ||
        typeof y === 'symbol')) {
        return eq(Primitive(x), y);
    }

    return false;
};