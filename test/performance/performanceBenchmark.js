var Benchmark = require('benchmark');
var {Programmer1, Programmer2, Programmer3, createProgrammer} = require('../../src/programmer');

var suite = new Benchmark.Suite;

// add tests
suite
    .add('prototype', function () {
        var programmer = new Programmer1();

        ['Clojure', 'Java', 'Go'].forEach(programmer.learnNewLanguage, programmer);

        programmer.isPragmatic();
    })
    .add('class', function () {
        var programmer = new Programmer2();

        ['Clojure', 'Java', 'Go'].forEach(programmer.learnNewLanguage, programmer);

        programmer.isPragmatic();
    })
    .add('closure', function () {
        var programmer = createProgrammer();

        ['Clojure', 'Java', 'Go'].forEach(programmer.learnNewLanguage);

        programmer.isPragmatic();
    })
    .add('OLOO', function () {
        var programmer = Object.create(Programmer3);
        programmer.init();

        ['Clojure', 'Java', 'Go'].forEach(programmer.learnNewLanguage, programmer);

        programmer.isPragmatic();
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({'async': true});


// if you have 90,000,000 ops/sec you're testing no op code
// beware JIT optimizations like dead code elimination
// those things above only matter if you create thousands of objects during critical path (not on load time)