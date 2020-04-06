---
title: JavaScript LeetCode Day 1
date: 2020-04-06 19:49:38
categories:
  - algorithm
tags:
  - javascript
  - leetcode
  - algorithm
---

从今天开始，打算刷一下 LeetCode，复习一下算法和数据结构的基础知识。最近写业务较多，感觉需要换换脑子。再者毕竟今年行情不好，有备无患。

节奏是打算每天刷3道 medium 难度，基本按照提交的通过率从高往低的来，或者是非常经典的题目。这样一开始刷的应该是相对来说比较容易的，可以循序渐进。计划是每个标签刷10道，这样下来一个月可以刷8个标签，可以把常见的数据结构都过一遍。

这里记录的是刷的过程中的一些心得，和大概的思路。具体的代码我也每日更新到我的 [GitHub](https://github.com/zhengminhui/leetcode-javascript) 仓库。

#### 15. 3Sum

先 sort array, logn；然后从左边 i 开始，可以拿到 diff = 0 - num[i], 数组剩下的，就是2sum，任意两个数加和为diff。使用双指针 j, k 一头一尾开始遍历。有一个corner case 是 [0,0,0,0]， 去重是关键，方法是判断，nums[i] 不等于前一个数 nums[i-1]。

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const res = [];
  const len = nums.length;
  const target = 0;
  nums = nums.sort((a, b) => a - b);

  for (let i = 0; i < len - 2; i++) {
    if (i === 0 || (i > 0 && nums[i] !== nums[i - 1])) {
      let j = i + 1;
      let k = len - 1;

      while (j < k) {
        const sum = nums[i] + nums[j] + nums[k];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[k]]);
          // 判断毗邻两数字是否想等，相等的话继续滑动, 避免添加重复的答案
          while (j < k && nums[j] === nums[j + 1]) {
            j += 1;
          }
          while (j < k && nums[k] === nums[k - 1]) {
            k -= 1;
          }
          j += 1;
          k -= 1;
        }
        if (sum < target) {
          while (j < k && nums[j] === nums[j + 1]) {
            j += 1;
          }
          j += 1;
        } else if (sum > target) {
          while (j < k && nums[k] === nums[k - 1]) {
            k -= 1;
          }
          k -= 1;
        }
      }
    }
  }
  return res;
};

threeSum([1, -1, -1, 0]);
threeSum([0, 0, 0, 0]);
// threeSum([-1, 0, 1, 2, -1, -4])

```



#### 1329. Sort the Matrix Diagonally

一开始题目理解错了，想的方法是先vertical对每个子数组排序，再横排。仔细看了例子，原来是只排对角线的。解题思路是把对角线存在新数组里，排序之后塞回去。关键点是对角线上，i-j 值恒定。i、j是遍历2维数组时的index。在通过 forEach 遍历 map，最后放回mat。 space O(mn) time O(mnlogd) d is the length of diagnoal with D = min(m,n)

```js
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var diagonalSort = function (mat) {
  const map = new Map();
  const m = mat.length;
  const n = mat[0].length;
  // 准备 map
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const curr = mat[i][j];
      // 在对角线上，i-j 的差值恒定,
      if (map.has(i - j)) {
        const arr = map.get(i - j);
        arr.push(curr);
        map.set(i - j, arr);
      } else {
        map.set(i - j, [curr]);
      }
    }
  }
  // sort map
  map.forEach((arr) => arr.sort((a, b) => a - b));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      mat[i][j] = map.get(i - j).shift();
    }
  }
  return mat;
};

```



#### 1395. Count Number of Teams

刷完3sum之后碰到这题，感觉是类似的。3sum是要求三者之和等于0（变种可以是任何值），这里的判断条件是3个值满足升序或降序。后来发现不行。解题思路是dp，生成两个数组，记录每个index处，后面还有多少个比它大，比他小的数量。再次遍历时，加和。

```js
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  if (rating.length < 3) return 0;

  let res = 0;
  const len = rating.length;
  const greaterThan = new Array(len).fill(0);
  const lessThan = new Array(len).fill(0);

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (rating[i] < rating[j]) {
        greaterThan[i] += 1;
      } else {
        lessThan[i] += 1;
      }
    }
  }

  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len; j++) {
      // 判断是升序，则看 j 后面还有多少个比 j 更大的
      if (rating[i] < rating[j]) {
        res += greaterThan[j];
      } else if (rating[i] > rating[j]) {
        // 判断是降序，则看后面有多少比 j 更小的
        res += lessThan[j];
      }
    }
  }
  return res;
};

// numTeams([2,5,3,4,1])
numTeams([4, 7, 9, 5, 10, 8, 2, 1, 6]);

```
