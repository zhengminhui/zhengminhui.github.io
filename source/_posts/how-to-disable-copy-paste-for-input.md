---
title: How to disable copy/paste/cut for input fields
date: 2018-03-16 13:34:18
categories:
- web
tags:
- html
---

Stop user copy paste for this input field.

```html
<input type="text" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off/>
```
