---
title: LeetCode 75 Day 11 动态规划一维
date: 2023-06-20 06:51:15
draft: false
featured: false
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-11-dp-one
---

今天有事，只做了 4 题一维动态规划。

[1137. 第 N 个泰波那契数](https://leetcode.cn/problems/n-th-tribonacci-number/?envType=study-plan-v2&envId=leetcode-75)

简单题，比 fib 多一个数。

```js
/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  if (n <= 1) return n;
  if (n === 2) return 1;

  let res = 0;
  let pre0 = 0;
  let pre1 = 1;
  let pre2 = 1;
  while (n > 2) {
    res = pre0 + pre1 + pre2;
    pre0 = pre1;
    pre1 = pre2;
    pre2 = res;
    n -= 1;
  }
  return res;
};
```

[746. 使用最小花费爬楼梯](https://leetcode.cn/problems/min-cost-climbing-stairs/?envType=study-plan-v2&envId=leetcode-75)

爬楼梯的变种题。

小于两级，直接判断数组大小。

从第二级开始走，比较前 1，和前 2 的开销，取较小的值。

dp[0] 是 0，表示 0 层没有开销。

dp[1] 表示爬到第一层的开销。

为了直观，将数组从 index 1 开始算。

表示 dp[1] 是 cost 第一层，要把 dp 数组错位 1 个，所以是长度是 cost.length + 1。

```js
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  if (!cost || !cost.length) return 0;
  // if cost is [10, 15], return math.min
  if (cost.length <= 2) {
    return Math.min(...cost);
  }

  const dp = new Array(cost.length + 1).fill(0);

  for (let i = 2; i <= cost.length; i++) {
    const pre = dp[i - 2] + cost[i - 2];
    const lat = dp[i - 1] + cost[i - 1];
    dp[i] = Math.min(pre, lat);
  }
  return dp[cost.length];
};
```

[198. 打家劫舍](https://leetcode.cn/problems/house-robber/?envType=study-plan-v2&envId=leetcode-75)

给 nums 头插入两个 0，方便 dp 数组计算。所以 i = 2 才是 nums 的开始。

抢了前面一家，就不能抢当前。

不抢前面一家，就可以算上当前。

其实可以不用数组，dp[i] 只和 dp[i+1] 和 dp[i+2] 有关，可以简化成两个变量，空间 O(1)。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums.length) return 0;

  nums.unshift(0, 0);
  const dp = new Array(nums.length).fill(0);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[nums.length - 1];
};
```

[790. 多米诺和托米诺平铺](https://leetcode.cn/problems/domino-and-tromino-tiling/?envType=study-plan-v2&envId=leetcode-75)

画图可穷举前 4 种 base case。

dp[4] 时要注意两个 L 对着拼接加一个条状横着放的两种情况。

推导公式 dp[5] = dp[i-1] 左右各加 1 个， 加上 dp[i-2] 左右各加 d[2].

```js
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const mod = 1e9 + 7;
  const dp = new Array(n).fill(1);

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;
  dp[4] = 11;

  for (let i = 5; i <= n; i++) {
    dp[i] = (dp[i - 1] * 2 + dp[i - 3]) % mod;
  }
  return dp[n];
};
```
