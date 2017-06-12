var {Programmer1, Programmer2, Programmer3, createProgrammer} = require('../../src/programmer');

test.skip('thisful with .prototype', function () {
    var programmer = new Programmer1();

    programmer.learnNewLanguage('Java');
    programmer.learnNewLanguage('Ruby');
    expect(programmer.isPragmatic()).toBeFalsy();
    programmer.learnNewLanguage('Python');
    expect(programmer.isPragmatic()).toBeTruthy();
});

test.skip('thisful with class', function () {
    var programmer = new Programmer2();

    programmer.learnNewLanguage('Java');
    programmer.learnNewLanguage('Ruby');
    expect(programmer.isPragmatic()).toBeFalsy();
    programmer.learnNewLanguage('Python');
    expect(programmer.isPragmatic()).toBeTruthy();
});

// no class and .prototype allowed
test.skip('thisful with Object.create()', function () {
    var programmer = Object.create(Programmer3);
    programmer.init();

    programmer.learnNewLanguage('Java');
    programmer.learnNewLanguage('Ruby');
    expect(programmer.isPragmatic()).toBeFalsy();
    programmer.learnNewLanguage('Python');
    expect(programmer.isPragmatic()).toBeTruthy();
});

// in this exercise you cannot use this
// only functions and object literals are allowed
test.skip('thisless', function () {
    var programmer = createProgrammer();

    programmer.learnNewLanguage('Elm');
    programmer.learnNewLanguage('Clojure');
    expect(programmer.isPragmatic()).toBeFalsy();
    programmer.learnNewLanguage('Haskell');
    expect(programmer.isPragmatic()).toBeTruthy();
});