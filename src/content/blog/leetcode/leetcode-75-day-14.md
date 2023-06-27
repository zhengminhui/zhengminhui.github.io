---
title: LeetCode 75 Day 14 区间集合和单调站
date: 2023-06-27 17:32:02
draft: false
featured: false
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-14-intervals-and-monotonic-stack
---

[435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/?envType=study-plan-v2&envId=leetcode-75)

按右端点排序，例子 `[[1,100],[11,22],[1,11],[2,12]]`。

排序后是 `[[1,11],[2,12],[11,22],[1,100]]`。

如果按左端点排序，当第一个右端点巨大时，要删掉很多区间，不满足找最小值。

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */

var eraseOverlapIntervals = function (intervals) {
  if (!intervals.length) return 0;
  let ans = 1;
  intervals.sort((a, b) => a[1] - b[1]);

  let right = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    // 如果当前的左端点比标记的右端点大，说明 ok。然后更新右端点。
    // 如果不大，就可以挖去。如[2,12]
    if (cur[0] >= right) {
      ans++;
      right = cur[1];
    }
  }

  return intervals.length - ans;
};
```

[452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/?envType=study-plan-v2&envId=leetcode-75)

还是按右端点排序，然后检查当前的左端点是否在标记的右端点左边，如果在，说明可以扎破。

如果不在了，更新右端点。

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (!points.length) return 0;
  let res = 0;
  points.sort((a, b) => a[1] - b[1]);

  let i = 0;
  while (i < points.length) {
    let right = points[i][1];
    i++;
    while (i < points.length && points[i][0] <= right) {
      i++;
    }
    res++;
  }

  return res;
};
```

[739. 每日温度](https://leetcode.cn/problems/daily-temperatures/?envType=study-plan-v2&envId=leetcode-75)

把 index push 进数组

只要今天的温度比 stack 顶部的温度高就 pop，

然后计算 index 差值，然后写到 j 天的位置

```js
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

var dailyTemperatures = function (temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      // pop 出来的是 index
      const j = stack.pop();
      // 再把差值写回到原来 index 的位置
      res[j] = i - j;
    }
    stack.push(i);
  }

  return res;
};
```

[901. 股票价格跨度](https://leetcode.cn/problems/online-stock-span/?envType=study-plan-v2&envId=leetcode-75)

关键词，小于等于。连续。

翻译，从今天开始，往左数，小于等于的长度，包括当前。

维护一个单调栈，如果新的 price 比栈顶的数值大，依次清空栈顶，然后把新的最大的 push 入栈。

```js
var StockSpanner = function () {
  this.stack = [];
  // push 进一个[index, value] 初始组合
  this.index = -1;
  this.stack.push([this.index, Infinity]);
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.index++;
  //
  while (price >= this.stack[this.stack.length - 1][1]) {
    this.stack.pop();
  }
  // 否则计算距离差= 当前 index - 栈顶 index
  const res = this.index - this.stack[this.stack.length - 1][0];
  // 计算完成之后再 push 这对组合入栈
  this.stack.push([this.index, price]);
  return res;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
```

到此还剩下 10 道关于图和优先队列的，我准备放一放，以后有机会专项夯实算法的阶段再来做。明天开始做 top interview 150。
