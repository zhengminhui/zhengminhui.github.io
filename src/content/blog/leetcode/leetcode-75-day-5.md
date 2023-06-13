---
title: LeetCode 75 Day 5 哈希表
date: 2023-06-12 14:07:45
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-5-hash-map
---

今天周一，状态不好，可能是周末爬山太累了还没休息过来。

一共做了 4 道哈希的题。

[2215. 找出两数组的不同](https://leetcode.cn/problems/find-the-difference-of-two-arrays/?envType=study-plan-v2&envId=leetcode-75)

很直接，时间 O(n), 空间 O(n)。

检查 nums 和 ans 里有没有该数字，没有，就插入，最后返回。

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[][]}
   */
  var findDifference = function (nums1, nums2) {
    const ans1 = [];
    const ans2 = [];

    for (let i = 0; i < nums1.length; i++) {
      const cur = nums1[i];
      if (!nums2.includes(cur) && !ans1.includes(cur)) {
        ans1.push(cur);
      }
    }
    for (let i = 0; i < nums2.length; i++) {
      const cur = nums2[i];
      if (!nums1.includes(cur) && !ans2.includes(cur)) {
        ans2.push(cur);
      }
    }
    return [ans1, ans2];
  };
};
```

[1207. 独一无二的出现次数](https://leetcode.cn/problems/unique-number-of-occurrences/?envType=study-plan-v2&envId=leetcode-75)

先遍历生成 map，然后遍历 map 检查次数是否唯一。

```js
/**
 * @param {number[]} arr
 * @return {boolean}
 */
// 生成 hashmap 后遍历次数。
/**
 * @param {number[]} arr
 * @return {boolean}
 */
// 生成 hashmap 后遍历次数。
var uniqueOccurrences = function (arr) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (map.has(cur)) {
      map.set(cur, map.get(cur) + 1);
    } else {
      map.set(cur, 1);
    }
  }
  const res = [];
  for (const [num, time] of map) {
    if (res.includes(time)) {
      return false;
    } else {
      res.push(time);
    }
  }
  return true;
};
```

[1657. 确定两个字符串是否接近](https://leetcode.cn/problems/determine-if-two-strings-are-close/?envType=study-plan-v2&envId=leetcode-75)

注意审题，只能替换成现有字符，所以 word 1，2 中出现的元素应该是相同的。

思路很简单，根据字符串建立 map，然后对词频排序，最烦判断词频是否一致。

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
// 字符串排序后统计各字符的频率，词频一样，表示可以转换
// 注意要是现有字符。uau, ssx 词频一样，但是是 false
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;

  const map1 = new Map();
  const map2 = new Map();
  for (const c of word1) {
    if (map1.has(c)) {
      map1.set(c, map1.get(c) + 1);
    } else {
      map1.set(c, 1);
    }
  }
  for (const c of word2) {
    if (map2.has(c)) {
      map2.set(c, map2.get(c) + 1);
    } else {
      map2.set(c, 1);
    }
  }
  const feq1 = [...map1.entries()].sort((a, b) => a[1] - b[1]);
  const feq2 = [...map2.entries()].sort((a, b) => a[1] - b[1]);
  if (feq1.length !== feq2.length) return false;
  // 因为是替换成现有的字符，所以要检查 map2 种的 char 是否在 map1 中。这里卡很久。
  for (const [key, value] of map1) {
    if (!map2.has(key)) {
      return false;
    }
  }
  for (let i = 0; i < feq1.length; i++) {
    // 如果词频不等，返回 false
    if (feq1[i][1] !== feq2[i][1]) {
      return false;
    }
  }
  return true;
};
```

[2352. 相等行列对](https://leetcode.cn/problems/equal-row-and-column-pairs/?envType=study-plan-v2&envId=leetcode-75)

先将行储存到哈希表里，并统计各次数，再遍历列，加上之前统计的次数，最终返回。

时间 O(n^2), 空间 O(n^2)。

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  const map = new Map();
  let res = 0;
  const n = grid.length;

  for (let i = 0; i < n; i++) {
    const str = grid[i].join(",");
    if (map.has(str)) {
      map.set(str, map.get(str) + 1);
    } else {
      map.set(str, 1);
    }
  }
  for (let j = 0; j < n; j++) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(grid[i][j]);
    }
    const str = arr.join(",");
    if (map.has(str)) {
      res += map.get(str);
    }
  }
  return res;
};
```

这周目标刷到 50 题。
