# Type coercion

Main source of JS related jokes and funny presentations (WTF JS, JS: the WAT parts etc.).

Cool to have a good laugh.

Even cooler to understand the lang we're paid for.

## == (30 min)

We gonna write eq(x, y) function that works the same way as ==.

== is sometimes called loose equality operator.

In spec it's called abstract equality operator.

* go to [spec](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-abstract-equality-comparison)
* Using TDD implement your own version of ==
* Use the ubiquitous language from the spec when writing your tests
* remember not to use == in your own implementation
* only ===, typeof and explicit type coercion (e.g. Number()) is allowed
* doubleEqualsTest.js

## ToPrimitive (10 min)

ToPrimitive is not exposed at the language level as ToBoolean, ToNumber or
ToString are (Boolean(), Number(), String()).

Run a separate TDD cycle for the custom ToPrimitive implementation.

* Implement algorithm from the [book](http://speakingjs.com/es5/ch08.html#toprimitive)
* toPrimitiveTest.js


# Thisless

In certain circles, there's a recent trend to avoid this, new, prototype and classes in JS.

Let's dissect them to understand the reason why.

## Thisful vs thisless programming (15 min)

In this exercise we gonna see different ways of writing the same code:
* thisful programming with .prototype (use this, new and .prototype)
* thisful programming with classes (use this, new and class)
* thisful programming with Object.create() (use this, but NOT new and class)
* thisless programming (use ONLY functions and object literal, NO this, new, .prototype and class)

Go to thisfulVsThislessTest.js and make the tests green.

## Under the hood (15 min)

Draw a conceptual diagram of the first version with constructor function and prototype.

Required elements:
* functions - use circle to represent those
* objects - use squares to represent those
* .prototype - use arrow with .prototype label
* [[Prototype]] aka ```__proto__``` - use arrow with [[Prototype]] label
* .constructor - use arrow with .constructor label

How does the [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and Object.prototype fit into this model?

How does the [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) and Function.prototype fit into this model?

## Custom NEW operator (10 min)

In this exercise we gonna implement our own equivalent of the new operator.

We gonna work in newTest.js

What is new doing under the hood?
* it creates a new object
* for the newly created object it sets [[Prototype]]/```__proto__``` to the constructor function's' .prototype
* it calls constructor function with the new object set as a context
* if the constructor function call returns an object we return it
* otherwise we return the newly create object from step 1

## Performance benchmark (5 min)

In this exercise we gonna run performance benchmark comparing 4 programming styles in JS.
* prototype based
* class based
* closure based
* object linking based (OLOO)

Go to performance/performanceBenchmark.js and run it on your machine. It may take some time.

Is the result significant for your applications?

Do you create thousands of objects on a critical path or mostly when the app starts?

Remember that performance discussions make sense in the context of a given application.

## Memory usage (5 min)

We gonna compare prototype based solutions with closure based solution in terms of memory usage.

Go to performance/memoryUsage.js and run the code.

How many objects do you create in your own apps?

## Currying (15 min)

What do JS functions do when we don't pass all arguments?

In the functional world we do currying.
```
f(a,b,c)
f(a) -> f(b, c)
f(a, b) -> f(c)
f(a, b, c) -> result
```
So when you call a function with fewer arguments than it expects, you get
a new function that takes the remaining arguments.

Go to curryingTest.js and implement curry function

## Currying in practice (5 min)

In OO world it's very common to pass things that don't change during app
lifetime as constructor arguments and use function arguments
for things that constantly change at runtime.
e.g.
```
class UserDataFetcher {
    constructor(ajax) {
        this.ajaxClient = ajax;
    }

    fetchById(id) {
        return id ? this.ajaxClient.fetch(id) : {};
    }

    ...
}
```
Thisless/classless equivalent would be:
```
function userDataFetcher(ajax) {
    return function fetchById(id) {
        return id ? ajax.fetch(id) : {};
    };
}
```

What if we didn't nest functions and had only one function taking all arguments?

```
function fetchUserById(ajax, id) {
    return id ? ajax(id) : {};
};
```

Please note how we strategically positioned things that change often
as rightmost parameters in the function signature.

Go to curriedDITest.js and see how our curry function can be used
to avoid passing ajax as first argument over and over again.


