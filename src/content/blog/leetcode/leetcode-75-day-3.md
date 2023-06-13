---
title: LeetCode 75 Day 3 双指针
date: 2023-06-08 11:25:13
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-3-double-pointers
---

今天做的双指针类型，题目都比较简单，做的很快，上午十一点就刷完了。

[283. 移动零](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=leetcode-75)

简单题，双指针，头部找 0，遇则删，尾部插入新的 0。故能保持其他数字之顺序。Time O(n)。

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let i = 0;
  let end = nums.length - 1;
  while (i < end) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      end--;
    } else {
      i++;
    }
  }
};
```

[392. 判断子序列](https://leetcode.cn/problems/is-subsequence/description/?envType=study-plan-v2&envId=leetcode-75)

简单题，在 s 和 t 上个维护 1 个指针，如果 char 相等，i 指针加 1，当等于 s 长度时，就说明匹配到了子序列。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (!s.length) return true;

  let i = 0;
  let j = 0;
  while (j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    if (i === s.length) {
      return true;
    }
    j++;
  }
  return false;
};
```

[11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=leetcode-75)

中等难度，可以算简单题了。根据木桶理论，比较两边的高，哪个低，来乘以底边长，就是围成的矩形面积。

然后判断哪边高，保留高的一边，另一边向对侧收敛。

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;
  let i = 0;
  let j = height.length - 1;
  while (i < j) {
    const h = Math.min(height[i], height[j]);
    const base = j - i;
    max = Math.max(max, h * base);
    if (height[i] >= height[j]) {
      j--;
    } else {
      i++;
    }
  }
  return max;
};
```

[1679. K 和数对的最大数目](https://leetcode.cn/problems/max-number-of-k-sum-pairs/description/?envType=study-plan-v2&envId=leetcode-75)

第一次做这题，一开始走了点弯路，想的复杂了。

最简单直接的还是先排序，然后左右指针向中间靠拢。

因为排序算法，时间是 O(nlogn)。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  nums = nums.sort((a, b) => a - b);
  let res = 0;
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === k) {
      res++;
      i++;
      j--;
    } else if (sum > k) {
      j--;
    } else if (sum < k) {
      i++;
    }
  }
  return res;
};
```

今天时间充裕，还做了其他题，等到对应门类时再总结。
