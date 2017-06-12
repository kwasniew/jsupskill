var {Programmer1, createProgrammer} = require('../../src/programmer');

let array = [];
for (let i = 0; i < 1000000; ++i) {

    // TODO: uncomment one of the below to see the memory usage
    var programmer = createProgrammer();
    //var programmer = new Programmer1();

    array.push(programmer);
}
console.log(process.memoryUsage().heapUsed / 1000000, 'MB');
console.log(array.length);