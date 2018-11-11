---
title: Learn Events
date: 2018-04-15 16:47:42
categories:
- web
tags:
- window
- events
- capture/bubbling
- delegate
---

#### register

```js
myElement.onclick = functionA;
myElement.onclick = functionB;
```

second row will overwrite first row

```js
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
```

both would run

which should use

* inline event handlers `<button onclick="bgChange()">Press me</button>` （don't use）
* Event handler properties; element.onclick; better cross-browser compatibility (IE8)
* DOM Level 2 Events; element.addEventListener('click', functionA); (IE9, can register multiple events，can be removed)

## event objects

e/evt/event

event.target

## Preventing default behavior

e.preventDefault();

## Event bubbling

Event bubbling and capture are two mechanisms that describe what happens when two handlers
of the same event type are activated on one element.

In the capturing phase:

The browser checks to see if the element's outer-most ancestor (`<html>`) has an onclick event handler registered on it in the capturing phase, and runs it if so.
Then it moves on to the next element inside `<html>` and does the same thing, then the next one, and so on until it reaches the element that was actually clicked on.

In the bubbling phase, the exact opposite occurs:

The browser checks to see if the element that was actually clicked on has an onclick event handler registered on it in the bubbling phase, and runs it if so.
Then it moves on to the next immediate ancestor element and does the same thing, then the next one, and so on until it reaches the `<html>` element.

Event handler registers in the bubbling phase. If you really want to register an event in the capturing phase instead, you can do so by registering your handler using addEventListener(), and setting the optional third property to true.

```js
element1.addEventListener('click', doSomething2, true); // fire at capture phase
element2.addEventListener('click', doSomething, false);
```

## Event delegation

if you want some code to run when you click on any one of a large number of child elements, you can set the event listener on their parent and have events that happen on them bubble up to their parent, rather than having to set the event listener on every child individually, especially children elements are frequently added and removed.

```html
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6" class="endangered">Item 6</li>
</ul>
```

```js
// Get the element, add a click listener...
document.getElementById('parent-list').addEventListener('click', function(e) {
  // e.target is the clicked element!
  // If it was a list item
  if (e.target && e.target.nodeName == 'LI') {
    // List item found!  Output the ID!
    console.log('List item ', e.target.id.replace('post-', ''), ' was clicked!');
  }
});

document.getElementById('parent-list').addEventListener('click', function(e) {
  if (e.target && e.target.matches('li.endangered')) {
    // List item found!  Output the ID!
    console.log('The ' + e.target.textContent + ' is endangered!');
  }
});
```

## related reading

mdn <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture>

event order <https://www.quirksmode.org/js/events_order.html>

event delegate <https://davidwalsh.name/event-delegate>

Event delegation <https://javascript.info/event-delegation>
