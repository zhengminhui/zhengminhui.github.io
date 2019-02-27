---
title: ECMAScript2015 modules
date: 2018-04-07 17:30:40
categories:
  - web
tags:
  - ECMAScript2015
  - es6
  - module
---

A module is Javascript code that automatically runs in **strict** mode with no way opt out.

module and script are not the same.

#### import and export

##### 1. named export (several per module)

```javascript
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
  return x * x;
}
export function diag(x, y) {
  return sqrt(square(x) + square(y));
}

//------ main.js ------

import { square, diag } from './lib.js';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

// can not reassign imported bindings
suqare = 2; // throw an error

// or

//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5
```

- syntax: import { identifiers } from './example.js' -> module specifier

- the list of binding to imports is not a destructured object

- the last one this is called _namespace_ import because the lib object does not exist inside the lib.js file and instead created to be used as a namespace object for all the exported members of lib.js.

- Be sure to include /, ./ or ../ at the beginning of the string representing the file for the best compatibility across browsers and node.js.

- lib.js is only execute once, no matter how many import statements have been declared. After the code to import the module executes, the instantiated module is kept in **memory** and reused whenever another import statement reference to it. e.g.

```javascript
// just execute lib.js once
import { diag } from './lib.js';
import { square } from './lib.js';
```

- import/export must be used outside condition statement or functions.

```javascript
if (flag) {
    export flag; // syntax error
}

function tryImport() {
import { diag } from './lib.js'; // syntax error
}
```

- ES6 import statement create _read-only_ bindings to variables, functions and classes. However you can use function to update in that module. and this change is automatically reflected on the imported name binding. e.g.

```javascript
export var name = 'Nico';
export function setName(x) {
  name = x;
}

import { name, setName } from './lib.js';
console.log(name); // Nico
setName('Jack');
console.log(name); // Jack

// can not reassign imported bindings
name = 'Nico'; // throw an error
```

- renaming export and import

```javascript
export {sum as add};
import {add} form './example.js';

// or
import { add as sum } from './example.js';
console.log(typeof add); // udefined
```

##### 2. default export (one per module)

```javascript
//------ myFunc.js ------
export default function () { ··· } // no semicolon!

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();

// or
function sum () { ... }
export default sum;

// or
export sum2() { ... }
export {sum as default}

// Or a class:

//------ MyClass.js ------
export default class { ··· } // no semicolon!

//------ main2.js ------
import MyClass from 'MyClass';
const inst = new MyClass();
```

##### 3. combine

you can use named export and default together

note: the default must come before the non-defaults in import statement.

```js
export var name = 'Nico';
export default function () { ··· }

import sum, { name } from './example.js';

// or
import { default as sum, name } from './example.js';
```

##### 4. re-exporting

```js
import {add} form './example.js';
export add;

// or short
export { add } from './example.js';

// export with different name
export { add as sum } from './example.js';

// export everything
export * from './example.js';
```

note: by exporting everything, you're including default as well as any named exports.

##### 5. importing without bindings

Some modules may not export anthing; instead they might only modify object in the gloabal scope. _Import without bindings are most likely to be used to create polyfills and shims_.

```js
// example.js
Array.prototype.somethingFancy = function () { ...}

// main.js
import './example.js'
let arr = [];
arr.somethingFancy();
```

#### loading modules

##### 1. use <script> as `defer`

```html
<!-- load a module JavaScript file -->
<script type="module" src="module.js"></script>

<!-- include a module inline -->
<script type="module">
  import { sum } from './example.js';

  let result = sum(1, 2);
</script>
```

- 'module' is not a content type like 'text/javascript', and browsers ignore `<script>` elements when type is unrecognized, providing good backwards-compatibility.

- in above code, result is not exposed globally because it exists only withing the module and is therefore not added to window as a property.

- module sequence; `<script type="module">` always acts as if the `defer` attribute is applied.

```html
<!-- this will execute first -->
<script type="module" src="module1.js"></script>

<!-- this will execute second -->
<script type="module">
  import { sum } from './example.js';

  let result = sum(1, 2);
</script>
```

- synchronies and sequential: **modules are parsed completely first to dientify all `import`, each import statement then triggers a fetch (either from network or cache) and no module is executed until all import resources have been loaded and executed.**

i. download and parse `module1.js` , recursive download and parse import in `module1.js`;

ii. parse inline module

once loading complete

iiii. recursive execute `import` source in `module1.js`, then execute `module1.js`

iiiii. recursive execute `import` source in inline module, then execute inline module

##### 2. use <script> as `async`

```html
<!-- no guarantee which one of these will execute first -->
<script type="module" async src="module1.js"></script>
<script type="module" async src="module2.js"></script>
```

the `async` causes the script file to be executed as soon as the file is completed downloaded and parsed. the order in document does not affect the order in which the scripts are executed. The scripts are always executed as soon as they finish downloading without waiting for the containing document to finish parsing.

##### 3. use `Worker`

```js
// load script.js as a script
let worker = new Worker('script.js');

// load module.js as a module
let worker = new Worker('module.js', { type: 'module' });
```

#### related reading material

1. Nicholas C. Zakas, [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules)

2. Axel Rauschmayer, [Exploring ES6](http://exploringjs.com/es6/ch_modules.html)

3. nodejs document, [Modules](https://nodejs.org/api/modules.html)
