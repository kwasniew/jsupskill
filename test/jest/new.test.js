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

test('allows to create new objects', function () {
    var p1 = new Person('Mateusz');
    var p2 = new AnotherPerson('Kate'); // it's a function constructor call
    var p3 = new NullPerson('Mateusz');

    expect(p1.sayHi()).toBe('Hi, I am Mateusz');
    expect(p2).toEqual({});
    expect(p3 instanceof NullPerson).toBeTruthy();
});

test.skip('allows to create new objects - own implementation - happy path', function () {
    var p1 = NEW(Person, ['Mateusz']);

    expect(p1.sayHi()).toBe('Hi, I am Mateusz');
});

test.skip('allows to create new objects - own implementation - constructor fn returns object', function () {
    var p2 = NEW(AnotherPerson, ['Mateusz']);

    expect(p2).toEqual({});
});

test.skip('allows to create new objects - own implementation - constructor function returns primitive value', function () {
    var p3 = NEW(NullPerson, ['Mateusz']);

    expect(p3 instanceof NullPerson).toBeTruthy();
});