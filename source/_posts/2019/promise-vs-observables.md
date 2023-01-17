---
title: Promise vs Observables
categories:
  - web
tags:
  - ECMAScript2015
  - es6
  - promise
  - Observables
  - subscription
  - subscribe
abbrlink: 24019ac5
date: 2019-01-27 01:37:04
---

## Difference

* Single value vs multiple values
* Eager vs lazy
* Not cancellable vs cancellable
* Multicast vs either unicast or multicast
* Always asynchronous vs possibly asynchronous

## Single value vs multiple values

```js
// promise
const numberPromise = new Promise((resolve) => {
    resolve(5);
    resolve(10);
});

// prints only 5
numberPromise.then(value => console.log(value));

// observable
const numberObservable = new Observable((observer) => {
    observer.next(5);
    observer.next(10);
});

// prints 5 and 10
numberObservable.subscribe(value => console.log(value));
```

Wrapping `setInterval` in Observable: 

```js
const secondsObservable = new Observable((observer) => {
    let i = 0;
    setInterval(() => {
        observer.next(i++);
    }, 1000);
});

secondsObservable.subscribe(value => console.log(value));
// logs:
// 0
// 1
// 2
// and so on, every second
```

## Eager vs lazy

For `Promise`, the `executor` function is executed immediately by the Promise implementation, passing `resolve` and `reject` functions.

For `Observable`, functions passed to `Observable` constructor gets called only when someone actually subscribe to an Observable.

```js
// promise print immediately
const promise = new Promise(() => {
    console.log('I was called!');
});

const observable = new Observable(() => {
    console.log('I was called!');
});
// nothing happens here

observable.subscribe();
// just now "I was called!" gets printed


const secondsObservable = new Observable((observer) => {
    let i = 0;
    setInterval(() => {
        observer.next(i++);
    }, 1000);
});
```

Thanks to laziness, `setInterval` is not called at this point and even `i` variable is not initiated.

## Not cancellable vs cancellable

ES6 promise do not support `cancel` method. Some Promise libraries like Bluebird support `cancel` method.

```js
const secondsObservable = new Observable((observer) => {
    let i = 0;
    const token = setInterval(() => {
        observer.next(i++);
    }, 1000);
  
    return () => clearInterval(token);
});

const subscription = 
    secondsObservable.subscribe(value => console.log(value));

subscription.unsubscribe();
```

`subscribe` doesn’t return Observable! This means you cannot chain several subscribe calls like you would chain `then` calls in Promises. `subscribe` returns a Subscription for given Observable. This Subscription has only one method  -- `unsubscribe`  -- which you can call, when you decide you don’t want to listen to certain Observable anymore.

## Multicast vs either unicast or multicast

Promises (because of their eager nature) are always “multicast”. Function passed to Promise constructor is called only when Promise is created and never again (unless you create brand new Promise with that function of course). 

```js

const waitOneSecondPromise = new Promise((resolve) => {
    console.log('I was called!');
    setTimeout(() => resolve(), 1000);
});

waitOneSecondPromise.then(doSomething);

// 500ms passes

waitOneSecondPromise.then(doSomethingElse);
// the console will print only once, and doSomethingElse will be called after only half second.

```

That person would naturally expect doSomethingElse to be called exactly one second from the moment it was passed to then, but in that case it would be called after half a second.

```js
const waitOneSecondObservable = new Observable((observer) => {
    console.log('I was called');
  
    setTimeout(() => observer.next(), 1000);
});

waitOneSecondObservable.subscribe(doSomething);

// 500 ms

waitOneSecondObservable.subscribe(doSomethingElse)
```

Here every call to `subscribe` will start it’s own clock. Both doSomething and doSomethingElse functions will be called one second from the moment they were passed to `subscribe`. If you look in the console, you will see `"I was called!"` printed to console twice, which shows that function passed to `Observable` constructor was indeed called twice and two instances of `setTimeout` timer were created.


By using `share` operator, you can make the `Observable` perform only once and then share between subscribers.

```js
const sharedWaitOneSecondObservable =
    waitOneSecondObservable.share();

sharedWaitOneSecondObservable.subscribe(doSomething);

// 500 ms passes

sharedWaitOneSecondObservable.subscribe(doSomethingElse);
```

If Observable shares a result between many subscribers, we say it is “multicast”, since it casts single value to multiple entities.

## Always asynchronous vs possibly asynchronous

Promise is asynchronous even we call `resolve` synchronously.

```js
const promise = new Promise((resolve) => {
    resolve(5);
});

promise.then(value => console.log(value + '!'));

console.log('And now we are here.');
```

First `"And now we are here."` is logged and just then `"5!"`

Observable may emit values synchronously.

```js
const observable = new Observable((observer) => {
    observer.next(5);
});

observable.subscribe(value => console.log(value + '!'));

console.log('And now we are here.');
```

`"5!"` appears first and just then we see `"And now we are here."`.

## Reference

1. [promises-vs-observables](https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13)
