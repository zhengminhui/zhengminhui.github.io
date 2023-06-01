---
title: Timers in JavaScript
categories:
  - tech
tags:
  - javascript
  - setTimeout
  - setInterval
postSlug: d1698058
date: 2018-10-20 16:55:28
---

#### Challenge 1

print the following 2 messages after their corresponding delays.

- Print the message “_Hello after 4 seconds_” after 4 seconds
- Print the message “_Hello after 8 seconds_” after 8 seconds.

**Constraints**:
You can define only a single function in your solution, which includes inline functions. This means many `setTimeout` calls will have to use the exact same function.

```javascript
const func = time => {
  console.log(`Hello after ${time} seconds`);
};
setTimeout(func, 4000, 4);
setTimeout(func, 8000, 8);
```

setTimeout clearTimeout;

setInterval clearInterval

setImmediate clearImmediate

delay is not guarantee

```js
setTimeout(() => console.log("Hello after 0.5 seconds. MAYBE!"), 500);
for (let i = 0; i < 1e10; i++) {
  // Block Things Synchronously
}
```

#### Challenge 2

Write a script to print the message “Hello World” every second, but only 5 times. After 5 times, the script should print the message “Done” and let the Node process exit.

```js
let count = 0;
const itv = setInterval(() => {
  console.log("hello world");
  count += 1;
  if (count === 5) {
    console.log("done");
    clearInterval(itv);
  }
}, 1000);
```

#### Challenge 3

only use `const`, can't use `let` or `var`.

Write a script to continuously print the message “Hello World” with varying delays. Start with a delay of 1 second and then increment the delay by 1 second each time. The second time will have a delay of 2 seconds. The third time will have a delay of 3 seconds, and so on.

print

Hello World. 1
Hello World. 2
Hello World. 3
...

```js
const recur = delay => {
  setTimeout(() => {
    console.log("Hello World.", delay);
    recur(delay + 1);
  }, delay * 1000);
};
recur(1);
```

#### Challenge 4

Write a script to continuously print the message “_Hello World_” with the same varying delays concept as challenge #3, but this time, in groups of 5 messages per main-delay interval. Starting with a delay of 100ms for the first 5 messages, then a delay of 200ms for the next 5 messages, then 300ms, and so on.

print

```
Hello World. 100  // At 100ms
Hello World. 100  // At 200ms
Hello World. 100  // At 300ms
Hello World. 100  // At 400ms
Hello World. 100  // At 500ms
Hello World. 200  // At 700ms
Hello World. 200  // At 900ms
Hello World. 200  // At 1100ms
...
```

**Constraints:** You can use only `setInterval` calls (not `setTimeout`) and you can use only ONE if statement.

```js
let lastIntervalId,
  counter = 5;
const greeting = delay => {
  if (counter === 5) {
    clearInterval(lastIntervalId);
    lastIntervalId = setInterval(() => {
      console.log("Hello World. ", delay);
      greeting(delay + 100);
    }, delay);
    counter = 0;
  }
  counter += 1;
};
greeting(100);
```

#### original Article

[JavaScript Timers: Everything you need to know](https://medium.freecodecamp.org/javascript-timers-everything-you-need-to-know-5f31eaa37162)
