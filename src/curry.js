function curry(originalFn) {
                            // rest [1,2]
    return function curried(...outerArgs) {
          //   2             <        3
        if (outerArgs.length < originalFn.length) {

            return function (...innerArgs) {
                return curried(...outerArgs.concat(innerArgs));
            };
        } else {
                              // spread
            return originalFn(...outerArgs);
        }
    };
}

module.exports = curry;
