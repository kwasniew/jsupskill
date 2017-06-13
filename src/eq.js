var Primitive = require('./toPrimitive');
var isObject = require('./isObject');

module.exports = function eq(x, y) {
    // ===
    if (typeof x === typeof y) {
        return x === y;
    }

    // null/undefined normalized
    if (x === null && y === undefined) {
        return true;
    }

    if (x === undefined && y === null) {
        return true;
    }

    // number == Number(string)
    if (typeof x === 'number' && typeof y === 'string') {
        return eq(x, Number(y));
    }

    if (typeof x === 'string' && typeof y === 'number') {
        return eq(Number(x), y);
    }

    // x == Number(boolean)
    if (typeof x === 'boolean') {
        return eq(Number(x), y);
    }

    if (typeof y === 'boolean') {
        return eq(x, Number(y));
    }

    // string|number == ToPrimitive(object)
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