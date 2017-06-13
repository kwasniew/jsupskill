var isObject = require('./isObject');

module.exports = function NEW(constructor, args) {
    var o = {};
    o.__proto__ = constructor.prototype;
    var retValue = constructor.apply(o, args);
    if (isObject(retValue)) return retValue;
    else return o;
};
