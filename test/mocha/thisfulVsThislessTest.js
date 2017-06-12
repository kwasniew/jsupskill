var assert = require('assert');
var {Programmer1, Programmer2, Programmer3, createProgrammer} = require('../../src/programmer');

describe('Comparing thisful and thisless style of programming', function () {
    it.skip('thisful with .prototype', function () {
        var programmer = new Programmer1();

        programmer.learnNewLanguage('Java');
        programmer.learnNewLanguage('Ruby');
        assert.ok(!programmer.isPragmatic());
        programmer.learnNewLanguage('Python');
        assert.ok(programmer.isPragmatic());
    });

    it.skip('thisful with class', function () {
        var programmer = new Programmer2();

        programmer.learnNewLanguage('Java');
        programmer.learnNewLanguage('Ruby');
        assert.ok(!programmer.isPragmatic());
        programmer.learnNewLanguage('Python');
        assert.ok(programmer.isPragmatic());
    });

    // no class and .prototype allowed
    // this allowed
    it.skip('thisful with Object.create()', function () {
        var programmer = Object.create(Programmer3);
        programmer.init();

        programmer.learnNewLanguage('Java');
        programmer.learnNewLanguage('Ruby');
        assert.ok(!programmer.isPragmatic());
        programmer.learnNewLanguage('Python');
        assert.ok(programmer.isPragmatic());
    });

    // in this exercise you cannot use this
    // only functions and object literals are allowed
    it.skip('thisless', function () {
        var programmer = createProgrammer();

        programmer.learnNewLanguage('Elm');
        programmer.learnNewLanguage('Clojure');
        assert.ok(!programmer.isPragmatic());
        programmer.learnNewLanguage('Haskell');
        assert.ok(programmer.isPragmatic());
    });
});