var isObject = require('./isObject');

var isPrimitive = function(x) {
    return !isObject(x);
};

module.exports = function toPrimitive(x) {
    if (isPrimitive(x)) {
        return x;
    } else if (isPrimitive(x.valueOf())) {
        return toPrimitive(x.valueOf());
    } else if (isPrimitive(x.toString())) {
        return toPrimitive(x.toString());
    } else {
        throw new TypeError('input cannot be converted to primitive');
    }
};
