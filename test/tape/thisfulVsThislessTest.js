var test = require('tape');
var {Programmer1, Programmer2, Programmer3, createProgrammer} = require('../../src/programmer');

test.skip('thisful with .prototype', function (t) {
    var programmer = new Programmer1();

    programmer.learnNewLanguage('Java');
    programmer.learnNewLanguage('Ruby');
    t.ok(!programmer.isPragmatic());
    programmer.learnNewLanguage('Python');
    t.ok(programmer.isPragmatic());

    t.end();
});

test.skip('thisful with class', function (t) {
    var programmer = new Programmer2();

    programmer.learnNewLanguage('Java');
    programmer.learnNewLanguage('Ruby');
    t.ok(!programmer.isPragmatic());
    programmer.learnNewLanguage('Python');
    t.ok(programmer.isPragmatic());

    t.end();
});

// no class and .prototype allowed
test.skip('thisful with Object.create()', function (t) {
    var programmer = Object.create(Programmer3);
    programmer.init();

    programmer.learnNewLanguage('Java');
    programmer.learnNewLanguage('Ruby');
    t.ok(!programmer.isPragmatic());
    programmer.learnNewLanguage('Python');
    t.ok(programmer.isPragmatic());

    t.end();
});

// in this exercise you cannot use this
// only functions and object literals are allowed
test.skip('thisless', function (t) {
    var programmer = createProgrammer();

    programmer.learnNewLanguage('Elm');
    programmer.learnNewLanguage('Clojure');
    t.ok(!programmer.isPragmatic());
    programmer.learnNewLanguage('Haskell');
    t.ok(programmer.isPragmatic());

    t.end();
});