---
title: Iterators and generators
date: 2018-05-01 01:19:28
categories:
  - web
tags:
  - ECMAScript2015
  - es6
  - iterators
  - generators
---

#### Iterators

Iterators are objects with a specific interface designed for iteration.

In JavaScript an iterator is an object that provides a `next()` method which returns the next item in the sequence. This method returns an object with two properties: `done` and `value`.

Below is an implementation of iterator in ES5.

```js
function createIterator(items) {
  var i = 0;
  return {
    next: function() {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;

      return {
        done: done,
        value: value,
      };
    },
  };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```

#### Generators

A generator is a function that returns an iterator. Generator functions are indicated by an asterisk (_) after the `function` key word and use the `yield` keyword. It doesn't matter how many whitespace between `function` and `_`. On MDN, the`_`is right next to`function`, however in Zakas's book, the`_` is just before the function name.

Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.

> you can use `yield` only inside generators. Using yield anywhere else is a syntax error, including in functions that are inside generators.

```js
// method 1: function declaration
function* createIterator1(items) {
  for (let index = 0; index < items.length; index++) {
    yield items[index];
  }
}

// method 2: function expression
let createIterator2 = function*(items) {
  for (let index = 0; index < items.length; index++) {
    yield items[index];
  }
};

const iterator = createIterator2([1, 2, 3]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

> create an arrow function that is also a generator is not possible.

#### Generator Object Method

Since generators are just functions. You can add generators to objects.

```js
// method 1: es5 style object literal
let obj1 = {
  createIterator: function*(items) {
    for (let index = 0; index < items.length; index++) {
      yield items[index];
    }
  },
};

// method 2: es6 shorthand
let obj2 = {
  *createIterator(items) {
    for (let index = 0; index < items.length; index++) {
      yield items[index];
    }
  },
};

const iterator = obj2.createIterator([1, 2, 3]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

#### Iterable and for-of loops

`iterable protocol`: The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a `for..of` construct.

An iterable is an object with a `Symbol.iterator` property.

These are iterables:

- Arrays and TypedArrays
- Maps
- Sets
- Strings
- `arguments`
- DOM Elements `NodeList`

> All iterators created by generators are also iterables, because generators assign the `Symbol.iterator` property by default.

##### Accessing the default Iterator

```js
let values = [1, 2, 3];

// same process happens behind the scene when using for-of loop
let iterator = values[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// check
function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function';
}

console.log(isIterable([1, 2, 3])); // true
console.log(isIterable('Hello')); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false
```

#### Creating Iterator

```js
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  },
};

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
  console.log(x);
}

// 1
// 2
// 3
```

#### Built-in Iterators

#### collection iterators

- `entries()`
- `values()`
- `keys()`

##### `entries()`

- array: [index, value]
- set: [value, value]
- map: [key, value]

##### `values()`

- array: value
- set: value
- map: value

##### `keys()`

- array: index
- set: value
- map: key

#### Default Iterators for Collection Types

- array: `values()`
- set: `values()`
- map: `entries()`

```js
// destructuring and for-of loop
let data = new Map();

data.set('title', 'Understanding ECMAScript 6');
data.set('format', 'ebook');

// same as using data.entries()
for (let [key, value] of data) {
  console.log(key + '=' + value);
}
```

- NodeList

```js
var divs = document.getElementsByTagName('div');

for (let div of divs) {
  console.log(div.id);
}
```

#### Constructs accept iterables

Some other constructs in JS that use iterables are:

- `for-of`
- Destructuring of Arrays
- The spread operator (`…`)
- `Promise.all` and `Promise.race` accept iterables over Promises.
- Maps and Sets

```js
const map = new Map([[1, 'one'], [2, 'two']]);
map.get(1)
// one
const set = new Set(['a', 'b', 'c]);
set.has('c');
// true
```

#### Advanced Iterator Functionality

##### passing arguments to Iterators

The `next()` method also accepts a value which can be used to modify the internal state of the generator. A value passed to `next()` will be treated as the result of the last yield expression that paused the generator.

```js
function* createIterator() {
  let first = yield 1;
  let second = yield first + 2; // 4 + 2
  yield second + 3; // 5 + 3
}

let iterator = createIterator();

console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.next(5)); // "{ value: 8, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

#### Throw and Return

- throw

Resume the execution of a generator by throwing an error into it and returns an object with two properties done and value.

```js
function* gen() {
  while (true) {
    try {
      yield 42;
    } catch (e) {
      console.log('Error caught!');
    }
  }
}

var g = gen();
g.next();
// { value: 42, done: false }
g.throw(new Error('Something went wrong'));
// "Error caught!"
// { value: 42, done: false }
```

- return

Return the given value and finishes the generator.

```js
function* createIterator() {
  yield 1;
  return;
  yield 2;
  yield 3;
}

let iterator = createIterator();

console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

#### Delegating generators

```js
function* g1() {
  yield 1;
  yield 2;
}

function* g2() {
  yield 0;
  yield* g1();
  yield* [3, 4];
  yield* '56';
  yield* Array.from(arguments);
}

var iterator = g2(7, 8);

console.log(iterator.next()); // {value: 0, done: false}
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 4, done: false}
console.log(iterator.next()); // {value: '5', done: false}
console.log(iterator.next()); // {value: '6', done: false}
console.log(iterator.next()); // {value: 7, done: false}
console.log(iterator.next()); // {value: 8, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

`yield*` is an expression, not a statement, so it evaluates to a value.

```js
function* g4() {
  yield* [1, 2, 3];
  return 'foo';
}

var result;

function* g5() {
  result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true},
// g4() returned {value: 'foo', done: true} at this point

console.log(result); // "foo"
```

#### Asynchronous Task Running

##### tradition callback

```js
let fs = require('fs');

fs.readFile('config.json', function(err, contents) {
  if (err) {
    throw err;
  }

  doSomethingWith(contents);
  console.log('Done');
});
```

#### Asynchronous task runner

```js
function run(taskDef) {
  // create the iterator, make available elsewhere
  let task = taskDef();

  // start the task
  let result = task.next();

  // recursive function to keep calling next()
  function step() {
    // if there's more to do
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value(function(err, data) {
          if (err) {
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }

  // start the process
  step();
}

let fs = require('fs');

function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, callback);
  };
}

run(function*() {
  let contents = yield readFile('config.json');
  doSomethingWith(contents);
  console.log('Done');
});
```

#### Pros and Cons

Pros:

- Lazy Evaluation: It is calculated as we demand it;
- Memory Efficient: We generate only the values that are needed. We can defer the computation till we need it.

Cons:

- Generators are one-time access only. Once you’ve exhausted all the values, you can’t iterate over it again. To generate the values again, you need to make a new generator object.
- Generators do not allow random access as possible with arrays. Since the values are generated one by one, accessing a random value would lead to computation of values till that element. Hence, it’s not random access.

#### Related Reading

1.  Nicholas C. Zakas, [Iterators and Generators](https://leanpub.com/understandinges6/read#leanpub-auto-iterators-and-generators)

2.  Axel Rauschmayer, [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)

3.  Axel Rauschmayer, [Generators](http://exploringjs.com/es6/ch_generators.html)

4.  Brandon Morelli, [A Simple Guide to ES6 Iterators in JavaScript with Examples](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e)

5.  Arfat Salman, [Understanding Generators in ES6 JavaScript with Examples](https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)

6.  MDN, [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

7.  MDN, [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
