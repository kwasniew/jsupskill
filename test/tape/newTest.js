var test = require('tape');
var NEW = require('../../src/new');

function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function () {
    return 'Hi, I am ' + this.name;
};

function AnotherPerson(name) {
    this.name = name;
    return {}; // it has to be an object, not primitive value
}

function NullPerson(name) {
    this.name = name;
    return null; // it has to be an object, not primitive value
}

test('allows to create new objects', function (t) {
    var p1 = new Person('Mateusz');
    var p2 = new AnotherPerson('Kate'); // it's a function constructor call
    var p3 = new NullPerson('Mateusz');

    t.equal(p1.sayHi(), 'Hi, I am Mateusz');
    t.deepEqual(p2, {});
    t.ok(p3 instanceof NullPerson);

    t.end();
});

test.skip('allows to create new objects - own implementation - happy path', function (t) {
    var p1 = NEW(Person, ['Mateusz']);

    t.equal(p1.sayHi(), 'Hi, I am Mateusz');

    t.end();
});

test.skip('allows to create new objects - own implementation - constructor fn returns object', function (t) {
    var p2 = NEW(AnotherPerson, ['Mateusz']);

    t.deepEqual(p2, {});

    t.end();
});

test.skip('allows to create new objects - own implementation - constructor function returns primitive value', function (t) {
    var p3 = NEW(NullPerson, ['Mateusz']);

    t.ok(p3 instanceof NullPerson);

    t.end();
});