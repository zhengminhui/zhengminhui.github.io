---
title: ES6 Block Binding
categories:
  - web
tags:
  - es6
  - javascript
postSlug: 8d1d7da4
date: 2018-05-03 00:07:52
---

#### Var declaration and hoisting

Hoisting: Variable declarations using `var` are treated as if they are at the top of the **function** (or **global** scope, if declared outside of a function) regardless of where the actual declaration occurs.

#### Block-level Declarartion

Block-level declarations are those that declare variables that are inaccessible outside of a given block scope. Block scopes, also called lexical scopes, are created:

1.  Inside of a function
2.  Inside of a block (indicated by the `{` and `}` characters)

##### Let

`let` declarations are not hoisted to the top of the enclosing block.

##### No Redeclaration

```js
var count = 30;
// Syntax error
let count = 40;
```

But in a block, let ccan be use to declare an variable with same name.

```js
var count = 30;
// Does not throw an error
if (condition) {
  let count = 40;
  // more code
}
```

##### Const

`const`, like `let` declarations, are block-level declarations.

```js
if (condition) {
  const maxItems = 5;
  // more code
}
// maxItems isn't accessible here
```

`const` cannot re-declaration as well.

`const` cannot re-assign.

```js
const maxItems = 5;
maxItems = 6; // throws error
```

##### Declaring Objects with const

A `const` declaration prevents modification of the binding and not of the value itself.

```js
const person = {
  name: "Nicholas",
};

// works
person.name = "Greg";

// throws an error
person = {
  name: "Greg",
};
```

`const` prevents modification of the binding, not modification of the bound value.

#### The Temporal Dead Zone(TDZ)

A variable declared with either `let` or `const` cannot be accessed until after the declaration. Attempting to do so results in a reference error, even when using normally safe operations such as the `typeof` operation.

```js
if (condition) {
  console.log(typeof value); // ReferenceError!
  let value = "blue";
}

console.log(typeof value); // "undefined"

if (condition) {
  let value = "blue";
}
```
