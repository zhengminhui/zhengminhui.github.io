---
title: LeetCode 75 Day 4 滑动窗口和前缀和
date: 2023-06-09 14:59:26
tags:
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-4-sliding-window
---

leetcode 75 的题目整体都比较简单，中等题大部分之前也刷过。今天做的滑动窗口和前缀和栏目。

[643. 子数组最大平均数 I](https://leetcode.cn/problems/maximum-average-subarray-i/?envType=study-plan-v2&envId=leetcode-75)

滑动窗口，刚开始想简单了，把每个窗口的和都算了一遍，会超时。

每次只计算减左加右就可以了。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var findMaxAverage = function (nums, k) {
  let sum = nums.slice(0, k).reduce((a, b) => a + b);
  let max = sum;
  for (let i = 1; i <= nums.length - k; i++) {
    sum = sum - nums[i - 1] + nums[i + k - 1];
    max = Math.max(sum, max);
  }
  return max / k;
};
```

[1456. 定长子串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/?envType=study-plan-v2&envId=leetcode-75)

滑动窗口，如法炮制，左减右加。

做完发现好像并不需要每次真正的 slice 一个 window 出来。

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const vowels = ["a", "e", "i", "o", "u"];

  let count = 0;
  for (let i = 0; i < k; i++) {
    if (vowels.includes(s[i])) {
      count++;
    }
  }
  let max = count;

  for (let i = 1; i <= s.length - k; i++) {
    const left = s[i - 1];
    const right = s[i + k - 1];
    if (vowels.includes(left)) {
      count--;
    }
    if (vowels.includes(right)) {
      count++;
    }
    max = Math.max(count, max);
  }
  return max;
};
```

[1004. 最大连续 1 的个数 III](https://leetcode.cn/problems/max-consecutive-ones-iii/?envType=study-plan-v2&envId=leetcode-75)

本质是求滑动窗口的最大长度。

当窗口内的 0 不足 k 时，right 指针向右，窗口膨胀；当 0 大于 k 时，left 指针向右，窗口收缩。保证窗口内的 0 始终小于等于 k 个。

滑动窗口不一定非要切出数组，双指针的差值也是窗口，取决于要窗口内的数据，还是关注窗口的长度。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let left = 0;
  let right = 0;
  let res = 0;
  let zeros = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      zeros++;
    }
    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }
    res = Math.max(res, right - left + 1);
    right++;
  }
  return res;
};
```

[1493. 删掉一个元素以后全为 1 的最长子数组](https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element/?envType=study-plan-v2&envId=leetcode-75)

题干转化一下，求，只有 1 个 0 的滑动窗口的最大长度。

和上一题 K 为 1 时一模一样。默写。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

var longestSubarray = function (nums) {
  let left = 0;
  let right = 0;
  let zeros = 0;
  let k = 1;
  let max = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      zeros++;
    }
    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }
    max = Math.max(max, right - left + 1);
    right++;
  }
  return max - 1;
};
```

[1732. 找到最高海拔](https://leetcode.cn/problems/find-the-highest-altitude/?envType=study-plan-v2&envId=leetcode-75)

遍历数组，比较每次的最大值。

一点点优化，当往上爬的时候海拔才会增加，所以负数时不用比较。全为负数时海拔最高位 0。

```js
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let max = 0;
  let elevation = 0;
  for (let i = 0; i < gain.length; i++) {
    elevation += gain[i];
    if (gain[i] > 0) {
      max = Math.max(elevation, max);
    }
  }

  return max;
};
```

[724. 寻找数组的中心下标](https://leetcode.cn/problems/find-pivot-index/?envType=study-plan-v2&envId=leetcode-75)

需要公式推导一下。

pivol 左边总和 sum; pivot 自己 nums[i]，右边总和为 total - nums[i] - sum;

要求左右相等，可以推导出 sum = total - nums[i] - sum

移项可得，nums[i] = total - 2\*sum

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const total = nums.reduce((a, b) => a + b);

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    if (cur === total - 2 * sum) {
      return i;
    }
    sum += cur;
  }

  return -1;
};
```

希望能在端午节前做完，然后开始做 top 150。
