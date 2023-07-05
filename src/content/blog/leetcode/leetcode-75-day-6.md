---
title: LeetCode 75 Day 6 栈和队列
date: 2023-06-13 11:45:15
draft: true
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-6-stack-queue
---

今天做了 5 题，栈和队列。

[2390. 从字符串中移除星号](https://leetcode.cn/problems/removing-stars-from-a-string/?envType=study-plan-v2&envId=leetcode-75)

简单的 mid 题，一次遍历，遇到 ⭐️ 就 pop ，不是就 push。

```js
/**
 * @param {string} s
 * @return {string}
 */

var removeStars = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*") {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return stack.join("");
};
```

[735. 行星碰撞](https://leetcode.cn/problems/asteroid-collision/?envType=study-plan-v2&envId=leetcode-75)

这题花了点时间，我一开始想的是先 push 进去，遇到负数再 pop 出来。实现的复杂了。

现在的做法是用一个 flag 检查能不能 push 进去。另外也不用每次 pop 出来检查，peak 就可以了。

```js
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  const stack = [];
  let i = 0;
  while (i < asteroids.length) {
    const cur = asteroids[i];
    let ok = true;
    while (ok && stack.length && stack[stack.length - 1] > 0 && cur < 0) {
      // 不用 pop 出来比较，只用 peak 就行。
      const pre = stack[stack.length - 1];
      // 如果 pre 小于绝对值，不要了。
      if (pre <= -cur) {
        stack.pop();
      }
      // 如果 pre 大于绝对值，cur 就不要了，通过 boolean 来控制是否 push
      if (pre >= -cur) {
        ok = false;
      }
    }
    if (ok) {
      stack.push(cur);
    }
    i++;
  }
  return stack;
};
```

[394. 字符串解码](https://leetcode.cn/problems/decode-string/?envType=study-plan-v2&envId=leetcode-75)

遍历一次，时间 O(n)。

左括号 push 数字和当前字符串，然后开始记录括号里的字符串。右括号 pop 出数字和 res，开始拼接。

```js
/**
 * @param {string} s
 * @return {string}
 */

var decodeString = function (s) {
  let res = "";
  const stack = [];
  let num = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (/[0-9]/.test(char)) {
      // 如果是数字，开始累加
      num = num * 10 + parseInt(char, 10);
    } else if (char === "[") {
      // 如果是左括号，stack 分别 push 进当前的res 和 次数
      // 然后需要重置之前的 num 和 res，下一步开始处理中括号里的内容
      stack.push(res);
      stack.push(num);
      res = "";
      num = 0;
    } else if (char === "]") {
      // 遇到右括号，可以开始执行 repeat
      // repeat 就是刚刚 push 进去的 num
      const repeat = stack.pop();
      const prevRes = stack.pop();
      res = prevRes + res.repeat(repeat);
    } else {
      // 如果是普通字符串，res 累加
      // 如果是括号内，同样的，累加保存到 res
      res += char;
    }
  }

  return res;
};
```

[933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/?envType=study-plan-v2&envId=leetcode-75)

简单的设计题。记录队列，每次 push 时维护一个时间范围，把不符合的剔除出去。

```js
var RecentCounter = function () {
  this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);
  const range = [t - 3000, t];

  while (this.queue.length && this.queue[0] < range[0]) {
    this.queue.shift();
  }
  return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
```

[649. Dota2 参议院](https://leetcode.cn/problems/dota2-senate/?envType=study-plan-v2&envId=leetcode-75)

用栈+队列实现。

遍历 queue，如果同阵营，就 push 进 stack。

否则，将它从栈移除，到队列进入下一轮。最后检查 stack 里的元素。

```js
/**
 * @param {string} senate
 * @return {string}
 */
// 遍历 queue，如果
var predictPartyVictory = function (senate) {
  const queue = senate.split("");
  const stack = [];

  while (queue.length) {
    let first = queue.shift();
    if (!stack.length || stack[stack.length - 1] === first) {
      stack.push(first);
    } else {
      queue.push(stack.pop());
    }
  }
  return stack.pop() === "R" ? "Radiant" : "Dire";
};
```

刷到 30 题了。
