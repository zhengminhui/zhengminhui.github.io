---
title: Node.js modules
categories:
  - web
tags:
  - nodejs
  - modules
  - exports
  - javascript
abbrlink: c505c167
date: 2019-02-18 17:11:02
---

#### `module.exports` and `exports`

`exports` is a reference to the module.exports that is shorter to type.

The `exports` variable is available within a module's file-level scope, and is assigned the value of `module.exports` before the module is evaluated.

It allows a shortcut, so that `module.exports.f = ...` can be written more succinctly as `exports.f = ...`. However, be aware that like any variable, if a new value is assigned to exports, it is no longer bound to `module.exports`:

```js
// a.js
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

exports.foo = foo;
exports.bar = bar;

// or
module.exports = {
  foo: foo,
  bar: bar,
};

// This won't work! It assigned a new reference to exports variable
exports = {
  foo: foo,
  bar: bar,
};
```

#### Import

When loaded via `import` these modules will provide a single `default` export representing the value of module.exports at the time they finished evaluating.

```js
// foo.js
module.exports = { one: 1 };

// bar.mjs
import foo from "./foo.js";
foo.one === 1; // true
```

#### Caching

Modules are cached after the first time they are loaded. This means (among other things) that every call to `require('foo')` will get exactly the same object returned, if it would resolve to the same file.

Provided `require.cache` is not modified, multiple calls to `require('foo')` will not cause the module code to be executed multiple times.

To have a module execute code multiple times, export a function, and call that function.

##### Caveats

Modules are cached based on their resolved filename.

Caching is case-sensitive. For example, `require('./foo')` and `require('./FOO')` return two different objects, irrespective of whether or not `./foo` and `./FOO` are the same file.

#### Cycles

##### why support

> Cyclic dependencies are not inherently evil. Especially for objects, you sometimes even want this kind of dependency. For example, in some trees (such as DOM documents), parents refer to children and children refer back to parents. In libraries, you can usually avoid cyclic dependencies via careful design. In a large system, though, they can happen, especially during refactoring. Then it is very useful if a module system supports them, because the system doesn’t break while you are refactoring.
>
> -- <cite>Axel Rauschmayer</cite>

I think this example from nodejs document can clearly explain cyclic dependencies. <https://nodejs.org/api/modules.html#modules_cycles>

```js
// a.js
console.log("a starting");
exports.done = false;
const b = require("./b.js");
console.log("in a, b.done = %j", b.done);
exports.done = true;
console.log("a done");

// b.js
console.log("b starting");
exports.done = false;
const a = require("./a.js");
console.log("in b, a.done = %j", a.done);
exports.done = true;
console.log("b done");

// main.js
console.log("main starting");
const a = require("./a.js");
const b = require("./b.js");
console.log("in main, a.done = %j, b.done = %j", a.done, b.done);
```

When `main.js` loads `a.js`, then `a.js` in turn loads `b.js`. At that point, `b.js` tries to load `a.js`. In order to prevent an **infinite loop**, an **unfinished copy** of the `a.js` exports object is returned to the `b.js` module. `b.js` then finishes loading, and its exports object is provided to the `a.js` module.

The output is

```bash
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```

#### related reading material

1. nodejs document, [Modules](https://nodejs.org/api/modules.html)

2. Axel Rauschmayer, [Exploring ES6](http://exploringjs.com/es6/ch_modules.html)
