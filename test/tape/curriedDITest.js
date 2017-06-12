var test = require('tape');
var curry = require('../../src/curry');

function ajax(userId) {
    if(!userId) throw new Error('should not happen');
    return Promise.resolve({name: 'John Doe'});
}

// we can create function templates from the base function
// strategically place things that will change often as last arguments
// this is replaced with argument passing
function fetchUserById(ajax, userId) {
    return userId ? ajax(userId) : Promise.reject('no user id');
}

var fetchUserByIdCurried = curry(fetchUserById);

// we make ajax based fetcher here
var fetchById = fetchUserByIdCurried(ajax);

test.skip('happy path', function (t) {
    return fetchById('user123').then(function(data) {
        t.deepEqual(data, {name: 'John Doe'});
        t.end();
    });
});

test.skip('unhappy path', function (t) {
    return fetchById('').catch(function(error) {
        t.equal(error, 'no user id');
        t.end();
    });
});