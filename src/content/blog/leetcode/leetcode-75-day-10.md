---
title: LeetCode 75 Day 10 二分查找和回溯
date: 2023-06-19 11:35:58
draft: true
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-10-binary-search-backtracing
---

今天大暴雨，做 6 题，二分查找和回溯。

[374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/?envType=study-plan-v2&envId=leetcode-75)

简单题，针对返回值对 mid 加一减一就可以了。不用考虑端点包含的问题。

```js
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return      -1 if num is higher than the picked number
 *      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let i = 1;
  let j = n;

  while (true) {
    const mid = i + ((j - i) >> 1);
    const ans = guess(mid);
    if (ans === 0) {
      return mid;
    } else if (ans === -1) {
      j = mid - 1;
    } else if (ans === 1) {
      i = mid + 1;
    }
  }
};
```

[2300. 咒语和药水的成功对数](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/?envType=study-plan-v2&envId=leetcode-75)

一开始好奇为什么是二分法。

用暴力法，会超时, 无论是从小到大，还是从大到小计算。

将 potions 排序，找满足 p 大于 suc / s 的最小值（左端点）。

难点和吃香蕉的珂珂一样，怎么把题目转化成公式模型。

注意右边界市从界外开始，包含右边界。左边界可能会到右边界，因为可能所有的 portion 都不满足。

```js
/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  const res = [];
  potions = potions.sort((a, b) => a - b);
  const len = potions.length;
  for (let i = 0; i < spells.length; i++) {
    const left = bs(potions, spells[i], success);
    res.push(len - left);
  }
  return res;
};

// return left, which is the smallest one that satisfied.
function bs(arr, spell, suc) {
  let left = 0;
  // 从界外开始，包含右边界。左边界可能会到右边界，因为可能所有的 portion 都不满足。
  let right = arr.length;
  while (left < right) {
    // 用位运算，不用调用 floor
    // 这里的括号自动补错了位置，花了点时间。
    const mid = left + ((right - left) >> 2);
    if (arr[mid] * spell < suc) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
```

[162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/?envType=study-plan-v2&envId=leetcode-75)

二分法主要是用来找寻单调性，无论是单调增还是单调减。

峰值的定义是极左，极右都是无穷小。

左<=右, 继续向右搜寻；左>右, 左为峰值。

返回任意一个峰就可以。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
//
//
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + ((right - left) >> 1);
    // 比右边小，继续向右边搜索
    if (nums[mid] <= nums[mid + 1]) {
      left = mid + 1;
    } else if (nums[mid] > nums[mid + 1]) {
      right = mid;
    }
  }

  return right;
};
```

[875. 爱吃香蕉的珂珂](https://leetcode.cn/problems/koko-eating-bananas/?envType=study-plan-v2&envId=leetcode-75)

h 最小是 pile.length， 最快的情况是，一小时 1 堆，k 就是 `max(pile[i])`

一小时内不能跨堆吃。可以推导出，最大值就是 pile[i]， 再大也没用。

每个小时都要吃。 所以，不能一下都吃完，要找到尽量的最小值。

```js
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
//
var minEatingSpeed = function (piles, h) {
  let right = Math.max(...piles);
  let left = 0;
  while (left < right) {
    const mid = left + ((right - left) >> 2);
    // 如果算出来时间比 h 小，说明吃的太快了。需要慢点，所以把右端点向中间收敛。
    if (getTime(piles, mid) <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return right;
};

function getTime(piles, v) {
  let time = 0;
  for (const p of piles) {
    time += Math.ceil(p / v);
  }
  return time;
}
```

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/?envType=study-plan-v2&envId=leetcode-75)

经典的回溯题，默写模板。

push，递归，传入新的 index，pop。

跳出条件是达到规定长度。

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) return [];

  const dict = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const res = [];
  const path = [];

  function backtracking(index, path) {
    if (path.length === digits.length) {
      res.push(path.join(""));
      return;
    }
    // 获得当前数字对应的字符串
    const str = dict[digits[index]];

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      path.push(char);
      backtracking(index + 1, path);
      path.pop();
    }
  }

  backtracking(0, path);
  return res;
};
```

[216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/?envType=study-plan-v2&envId=leetcode-75)

一定要 k 个不同的正整数，加和等于 n。

注意剪枝，当 target 是负数时，不用再算下去。

回溯题一个小 tip，有的时候是从 `i = 0` 开始，有的时候是 `i = start` 开始。要注意甄别。从 start 开始通常是要排除重复的。

```js
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
//
var combinationSum3 = function (k, n) {
  const res = [];
  const cbt = [];
  function backtrack(start, target) {
    // 剪枝，减少运行次数，当 target 成负数时，没必要再继续走下去。
    if (target < 0) {
      return;
    }

    if (cbt.length === k) {
      if (target === 0) {
        res.push(cbt.slice());
        return;
      }
    }
    for (let i = start; i < 10; i++) {
      cbt.push(i);
      backtrack(i + 1, target - i);
      cbt.pop();
    }
  }
  backtrack(1, n);
  return res;
};
```
