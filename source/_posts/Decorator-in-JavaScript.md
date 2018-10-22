---
title: Decorators in JavaScript
date: 2018-10-20 17:14:24
categories:
  - web
tags:
  - ECMAScript2016
  - es7
  - decorator
  - javascript
---

# Decorators in JavaScript

## Decorators in Python

In Python, decorators provide a very simple syntax for calling higher-order functions. A Python decorator is a function that takes another function, extending the behavior of the latter function without explicitly modifying it.

```python
def identity(ob):
    return ob

@identity
def myfunc():
    print "my function"

myfunc()
print myfunc
```

```shell
my function
<function myfunc at 0xb76db17c>
```

## ES2016 Decorators

An ES2016 decorator is an expression which returns function and can take a target, name and property descriptor as arguments.

### Syntax

```js
// es5
var person = { name: 'John' };

function addAge(age) {
  return function(person) {
    return {
      age: age,
      name: person.name,
    };
  };
}

var newPerson = addAge(30)(person);
console.log(newPerson);

// es6 (babel)
// this is the decorator factory
function addAgeDecorator(age) {
  // this is the decorator
  return function(targetClass) {
    // do something with 'target' and 'value'...
    return class {
      name = new targetClass().name;
      age = age;
    };
  };
}

@addAgeDecorator(30)
class Person {
  name = 'John';
}

console.log(new Person());
```

### Decorating a property

```js
class Cat {
  @readonly
  meow() {
    console.log(`Meow!`);
  }

  sing() {
    console.log(`soft kitty~`);
  }
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

var Garfield = new Cat();
Garfield.meow = function() {
  console.log('I want lasagne!');
};
Garfield.sing = function() {
  console.log("Let's rock");
};

Garfield.meow();
Garfield.sing();
// http://jsfiddle.net/minhuizheng/0h45utcd/5/
```

explanation:

target — class that the property is a part of  
name — the name of the property the decorator is modifying  
descriptor — property descriptor. Think: object passed to Object.defineProperty

## Reference and Reading

1. [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)

2. [Javascript Decorators](https://medium.com/jsguru/javascript-decorators-dac7d4b6bba3)

3. [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

4. [JavaScript Decorators: What They Are and When to Use Them](https://www.sitepoint.com/javascript-decorators-what-they-are/)

5. [React DnD](http://react-dnd.github.io/react-dnd/)
