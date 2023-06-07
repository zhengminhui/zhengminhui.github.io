---
title: LeetCode 75 Day d
date: 2023-06-07 14:47:32
tags:
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-2
---

今天做了 5 题，数组字符串部分做完。

[1431. 拥有最多糖果的孩子](https://leetcode.cn/problems/kids-with-the-greatest-number-of-candies/description/?envType=study-plan-v2&envId=leetcode-75)

easy 题，先算出数组最大值，然后一次遍历，看当前值加上额外的糖果能不能大于等于最大值。 时间 O(n)。

```js
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const max = Math.max(...candies);
  const res = [];
  for (let i = 0; i < candies.length; i++) {
    res.push(candies[i] + extraCandies >= max);
  }
  return res;
};
```

[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/?envType=study-plan-v2&envId=leetcode-75)

简单题，注意的点就是中间会有连续的空格，要 filter 掉空字符串，最后再按空格 join。

```js
/**
 * @param {string} s
 * @return {string}
 */

var reverseWords = function (s) {
  return s
    .trim()
    .split(" ")
    .filter(c => c)
    .reverse()
    .join(" ");
};
```

[238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=leetcode-75)

中等，做过很多遍了。 Time O(n) Space O(1)。

先计算当前数左边的乘积，从第二个数开始计算，第一个数左边没有，left[0] 是 1。

再即算当前数右边的乘积，同理，从倒数第二个数开始算，right[len - 1] 是 1。

最后两数组相乘得到所有数的乘积。

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const len = nums.length;
  const left = new Array(nums.length).fill(1);
  const right = new Array(nums.length).fill(1);
  const res = [];

  for (let i = 1; i < nums.length; i++) {
    left[i] = nums[i - 1] * left[i - 1];
  }
  for (let j = nums.length - 1 - 1; j >= 0; j--) {
    right[j] = nums[j + 1] * right[j + 1];
  }
  for (let k = 0; k < nums.length; k++) {
    res[k] = left[k] * right[k];
  }

  return res;
};
```

[334. 递增的三元子序列](https://leetcode.cn/problems/increasing-triplet-subsequence/description/?envType=study-plan-v2&envId=leetcode-75)

看到递增子序列，先想到最长递增子序列那道题，但是那是 dp，时间复杂度高 O(n^2), 空间 O(n^2)。这道题做到动规再整理。

现在要求空间 O（1）。

这道题不求最长，只要满足 3 个即可，所以使用定长数组，fill infinity，如果能把数组填满即满足条件。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  const arr = new Array(3).fill(Infinity);
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    if (arr[0] > cur) {
      arr[0] = cur;
    } else if (arr[0] < cur && cur < arr[1]) {
      arr[1] = cur;
    } else if (arr[1] < cur) {
      arr[2] = cur;
      return true;
    }
  }
  return false;
};
```

[443. 压缩字符串](https://leetcode.cn/problems/string-compression/description/?envType=study-plan-v2&envId=leetcode-75)

双指针的思路，一个指针记录 start，一个 ptr 向后跑。如果当前 char 和下一位不相同, 或者 ptr 是末尾了，就可以开始写。

还有一个点是，因为是依次对 10 取余，所以写数字的时候要反转字符串。12 依次对 10 取余，是 2，1，所以要反转成 1，2。

因为是 inplace 写入，最后返回的是 ptr 的 index。

```js
/**
 * @param {character[]} chars
 * @return {number}
 */
// 时间是 O(n), 空间 O(1)
var compress = function (chars) {
  let ptr = 0;
  let start = 0;

  for (let i = 0; i < chars.length; i++) {
    // 如果指针是最后一位，或者当前和下一位不相同，就可以开始写。
    if (i === chars.length - 1 || chars[i] !== chars[i + 1]) {
      // 先把这个字符记录到 ptr 位，然后 ptr 加 1， 准备写次数，次数是跨度 i - start + 1
      chars[ptr] = chars[i];
      ptr += 1;
      let num = i - start + 1;
      if (num > 1) {
        const anchor = ptr;
        while (num > 0) {
          chars[ptr] = "" + (num % 10);
          num = Math.floor(num / 10);
          ptr += 1;
        }
        // 为什么要 reverse，因为 12 依次对 10 取余，是 2，1，所以要反转成1，2
        reverse(chars, anchor, ptr - 1);
      }
      // 前面一个数处理完了，更新 start 位置。
      start = i + 1;
    }
  }
  return ptr;
};

const reverse = (chars, i, j) => {
  while (i < j) {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
    i++;
    j--;
  }
};
```

明日继续。
