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

test.skip('happy path', function (done) {
    return fetchById('user123').then(function(data) {
        expect(data).toEqual({name: 'John Doe'});
        done();
    });
});

test.skip('unhappy path', function (done) {
    return fetchById('').catch(function(error) {
        expect(error).toBe('no user id');
        done();
    });
});