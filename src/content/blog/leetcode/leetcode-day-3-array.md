---
title: Leetcode Day 3 Array
date: 2023-07-05 17:25:28
draft: true
featured: false
tags:
  - leetcode
  - array
  - algorithm
postSlug: leetcode-day-3-array
---

数组的题目应该是最多的。

有些题目分到了二分，动规栏目里。这里就只整理这三个题库里标记数组的题目。

## Table of contents

## [26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间 O(n)，如果前面和后面一样，删掉前者。
var removeDuplicates = function (nums) {
  let i = 0;
  while (i < nums.length - 1) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
    i++;
  }
  return nums.length;
};
```

## [27. 移除元素](https://leetcode.cn/problems/remove-element/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
    i++;
  }
  return nums.length;
};
```

## [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/?envType=study-plan-v2&envId=top-100-liked)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// time O(n) space O(k)
// 第一遍遍历的目的，筛选出值得swap排序的数字，两个条件，大于 0 and 小于等于数组长度，
// 比如[1,2,-1]中的 -1, 和 [1,2,8] 中的 8，就没必要管
// 满足条件的数字，同时它还不在自己的位子的，
// 比如 [3,4,-1,1]中的 3，当 i=0， nums[0] = 3, nums[nums[0]-1]= -1,
// 而他应该在 index=2的位置。
// 简单来说，就是把数字n丢到 nums[n-1] 位置去
var firstMissingPositive = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    while (
      nums[i] > 0 &&
      nums[i] <= nums.length &&
      nums[i] !== nums[nums[i] - 1]
    ) {
      swap(nums, i, nums[i] - 1);
    }
  }
  for (let i = 0; i < nums.length; i++) {
    // 循环交换位置之后的数组，判断第一个缺失的正数
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  return nums.length + 1;
};

function swap(nums, a, b) {
  const tmp = nums[a];
  nums[a] = nums[b];
  nums[b] = tmp;
}
```

## [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 贪心算法 time O(n) space O(1)
// end 表示一定要移动了，启动的时候，就是一个一定要移动的时候。
var jump = function (nums) {
  let end = 0;
  let farthest = 0;
  let res = 0;
  // i 是一步一步向前，追逐 farthest。终止是 nums.length - 2
  for (let i = 0; i < nums.length - 1; i++) {
    // 当前位置能跳的最远处，是 nums[i] + i ，
    // 如[3,2,1] 第一个能跳的最远处是 3+0
    farthest = Math.max(nums[i] + i, farthest);
    // 如果现在的位置已经到了 end 处，就一定要走一步了。所以 res++，用能走的 farthest 更新 end。
    // 第一步开始的时候，就会第一次判断 end
    if (end === i) {
      res++;
      end = farthest;
      // 如果中间过程就能到最后，就不用再走完全程了。
      if (farthest === nums.length - 1) {
        return res;
      }
    }
  }
  return res;
};
```

## [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/?envType=study-plan-v2&envId=top-100-liked)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 两步比较
// 1 sum：当前数，前和+当前数
// 2 max：当前 sum 和 之前的最大
var maxSubArray = function (nums) {
  if (!nums.length) return 0;

  // max 是全局的最大值
  let max = nums[0];
  // sum 是遍历到当前的加和,累加
  let sum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 如果 sum 加当前数更小了，说明不应该加，直接用当前数重置
    // 如果 sum 加当前数更大了，说明找对了，继续向后
    sum = Math.max(nums[i], sum + nums[i]);
    max = Math.max(sum, max);
  }
  return max;
};
```

## [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/?envType=study-plan-v2&envId=top-interview-150)

从倒数第二个数往前找

如果当前的值（表示可以跳的长度）+ 当前的 index，大于右边的 index。

表明可以跳到下一步；这时，可以用当前的 index，更新 ptr

然后继续往左，重复。最后检查 ptr 是否能到起始位置。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let ptr = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= ptr) {
      ptr = i;
    }
  }
  return ptr === 0;
};
```

## [56. 合并区间](https://leetcode.cn/problems/merge-intervals/?envType=study-plan-v2&envId=top-100-liked)

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 按左端点排序，然后依次比对，如果后面的左端点，小于前面的右端点，则可以合并。
// 否则，push 前段，并更新之，重复此动作。
var merge = function (intervals) {
  // 先按子interval的左端点排序。
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];
  let pre = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (cur[0] <= pre[1]) {
      // 如果当前的左边界，小于前一组的右边界，说明左端落在前一组中。可以合并
      // 在pre上in-place 修改，以便继续向后合并。
      // 右端点，在前后的右端点中选择较大的。
      pre[1] = Math.max(pre[1], cur[1]);
    } else {
      // 不满足合并条件是，push 前段，重新赋值，把当前的赋为新的前段。
      res.push(pre);
      pre = cur;
    }
  }
  // 无论是满足，还是不满足的条件下，最后一个pre都没有被push进去，所以需要最后手动处理一下。
  res.push(pre);
  return res;
};
```

## [80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let pre = nums[0];
  let i = 1;
  while (i < nums.length) {
    const cur = nums[i];
    if (cur === pre) {
      // 删掉后面所有的 pre；
      while (nums[i + 1] === cur) {
        // 原地删除，始终检查 i+1，位置不用变。
        nums.splice(i + 1, 1);
      }
    } else {
      pre = cur;
    }
    i++;
  }
  return nums.length;
};
```

## [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 时间 O(n)，从后往前写入。
var merge = function (nums1, m, nums2, n) {
  while (m > 0 && n > 0) {
    if (nums1[m - 1] >= nums2[n - 1]) {
      nums1[m + n - 1] = nums1[m - 1];
      m--;
    } else {
      nums1[m + n - 1] = nums2[n - 1];
      n--;
    }
  }
  // 如果 n 还有，说明 nums2 还有多余的。
  while (n > 0) {
    nums1[m + n - 1] = nums2[n - 1];
    n--;
  }
};
```

## [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
// 0516note:之前写的太复杂了。
// 今天的情况只有两种，今天没有股票 dp_0，今天手里有股票 dp_1
// 如果今天继续没股票 dp_0 = max(昨天就没有； 昨天手里有，今天卖掉，拿到收益，dp_1+price[i]）
// 如果今天手里还有股票 dp_1 = max(昨天就有； 昨天没有，今天买了新的股票, 0-price[i])
// 初始状况:没股票 dp_0 = 0, 有股票，给一个不可知（不可能）的最小值 -infinity
// 最后肯定是手里没股票出清了收益大，所以返回 dp_0;
var maxProfit = function (prices) {
  if (!prices.length) return 0;

  let dp_0 = 0;
  let dp_1 = -Infinity;

  for (let i = 0; i < prices.length; i++) {
    dp_0 = Math.max(dp_0, dp_1 + prices[i]);
    dp_1 = Math.max(dp_1, 0 - prices[i]);
  }
  return dp_0;
};
```

## [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
// 今天没持有 = max（昨天也没持有，昨天卖了股票）
// 今天持有了 = max（昨天就持有了，昨天买了股票）
// dp_0 = max(dp_0, dp_1 + prices[i])
// dp_1 = max(dp_1, dp_0 - prices[i])
// base case
// dp_0 = 0； dp_1 = 负无穷。
// 负无穷就是说，第一天就持股，你的收益就是 -prices[0],
// 只是我们不知道 prices[0] 是多大，所以用一个最小的数来指代。
// 它只会存在一次，就会被 price[0] 更新。
var maxProfit = function (prices) {
  if (!prices.length) return 0;
  let dp_0 = 0;
  let dp_1 = -Infinity;

  for (let i = 0; i < prices.length; i++) {
    dp_0 = Math.max(dp_0, dp_1 + prices[i]);
    dp_1 = Math.max(dp_1, dp_0 - prices[i]);
  }
  return dp_0;
};
```

## [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/?envType=study-plan-v2&envId=leetcode-75)

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

## [169. 多数元素](https://leetcode.cn/problems/majority-element/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// time O(n), space O(1)
// 一个变量记录 major，一个计数，因为一定存在多数元素，所以遇则加，非则减，最后就能筛除最多的。
// 注意 count 为 0 时，需要替换 major 并且将 count 重新声明为 1
var majorityElement = function (nums) {
  let major = nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === major) {
      count++;
    } else {
      count--;
    }
    if (count === 0) {
      major = nums[i];
      count = 1;
    }
  }
  return major;
};
```

## [189. 轮转数组](https://leetcode.cn/problems/rotate-array/?envType=study-plan-v2&envId=top-100-liked)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 一把梭，能过。
var rotate = function (nums, k) {
  let tmp;
  while (k) {
    tmp = nums.pop();
    nums.unshift(tmp);
    k--;
  }
};
```

## [238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=leetcode-75)

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

## [274. H 指数](https://leetcode.cn/problems/h-index/description/?envType=study-plan-v2&envId=top-interview-150)

```js
/**
 * @param {number[]} citations
 * @return {number}
 */
// 时间 O(nlogn) 先排序了。再 O(N) 遍历。
var hIndex = function (citations) {
  const len = citations.length;
  if (!len) return 0;

  // asc 排序
  citations.sort((a, b) => a - b);
  let h = len;

  for (let i = 0; i < len; i++) {
    // 如果当前引用值大于数量了，返回 h。
    if (citations[i] >= h) {
      return h;
    }
    // 如果不行，逐步减少 h 指数。
    h--;
  }
  return h;
};
```

## [275. H 指数 II](https://leetcode.cn/problems/h-index-ii/description/)

```js
/**
 * @param {number[]} citations
 * @return {number}
 */
// 已经拍过序了，所以二分搜索，时间 O(logn)
// 找的是满足的引用数。
var hIndex = function (citations) {
  if (!citations.length) return 0;

  const len = citations.length;
  let i = 0;
  let j = len - 1;
  while (i < j) {
    const mid = (i + j) >> 1;
    // mid对应的引用数量 大于 论文数量，抛弃右边，因为右边引用值更高，就不用检查了。
    if (citations[mid] >= len - mid) {
      j = mid;
    } else {
      // mid 对应的引用1， 论文数量 5-1 = 4,不足，所以要增大引用数。向右看，左边不要了。
      i = mid + 1;
    }
  }
  // 注意 [0] 的情况。没有被引用的论文。
  return citations[j] >= len - j ? len - j : 0;
};
```

## [334. 递增的三元子序列](https://leetcode.cn/problems/increasing-triplet-subsequence/description/?envType=study-plan-v2&envId=leetcode-75)

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

## [345. 反转字符串中的元音字母](https://leetcode.cn/problems/reverse-vowels-of-a-string/?envType=study-plan-v2&envId=leetcode-75)

和字符串反转一样，注意审题，大小写都存在。双指针前后向中间收敛。时间 O(n)。

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  const arr = s.split("");
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    if (vowels.includes(arr[i]) && vowels.includes(arr[j])) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }

    if (!vowels.includes(arr[i])) {
      i++;
    }

    if (!vowels.includes(arr[j])) {
      j--;
    }
  }

  return arr.join("");
};
```

## [443. 压缩字符串](https://leetcode.cn/problems/string-compression/description/?envType=study-plan-v2&envId=leetcode-75)

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

## [605. 种花问题](https://leetcode.cn/problems/can-place-flowers/?envType=study-plan-v2&envId=leetcode-75)

大致思路不难，时间 O(n)。有两个 corner case 需要注意。

遍历数组，主要考虑 2 点：

1. 如果 i 位置有花，向前两格。

2. 如果 i 位置没花，分两种情况

3. `flowerbed[i+1]` 也没花，可以放心种。

4. i 是最后一个位置了，也可以放心种。因为前面过来的情况，在考虑 2-1 的情况下，都是合法的。

```js
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 1) {
      i++;
    } else if (
      flowerbed[i] === 0 &&
      (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)
    ) {
      n--;
      i++;
    }

    if (n === 0) {
      return true;
    }
  }

  return n <= 0;
};
```

## [1071. 字符串的最大公因子](https://leetcode.cn/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75)

找两个字符串的最大公因子，我的思路很直接，从较短的串的全长开始截取，如果 gcd 分别重复若干遍等于对应的字符串，就是最大 gcd。

注意如果 `a+b` 不等于 `b+a`，可以提前排除一些 case。

```js
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
// 从短串的最长处开始遍历，找到第一个满足的 gcd 即是最大的。
var gcdOfStrings = function (str1, str2) {
  if (str1 + str2 !== str2 + str1) return "";

  const short = str1.length < str2.length ? str1 : str2;
  const long = str2.length > str1.length ? str2 : str1;
  let len = short.length;

  while (len > 0) {
    const i = short.length / len;
    const j = long.length / len;
    // 都能整除，才进行判断
    if (Number.isInteger(i) && Number.isInteger(j)) {
      const gcd = short.substring(0, len);
      // 如果 substring repeat 之后相等，说明是公因子.
      const shortRepeat = gcd.repeat(i);
      const longRepeat = gcd.repeat(j);
      if (shortRepeat === short && longRepeat === long) {
        return short.substring(0, len);
      }
    }
    len--;
  }

  return "";
};
```

## [1768. 交替合并字符串](https://leetcode.cn/problems/merge-strings-alternately/?envType=study-plan-v2&envId=leetcode-75)

类似合并两个有序链表，比那题简单，双指针遍历，时间 O(n)， 空间 O(1)。

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  let p1 = 0;
  let p2 = 0;
  let res = "";

  while (p1 < word1.length && p2 < word2.length) {
    res += word1[p1];
    p1++;
    res += word2[p2];
    p2++;
  }

  while (p1 < word1.length) {
    res += word1[p1];
    p1++;
  }

  while (p2 < word2.length) {
    res += word2[p2];
    p2++;
  }

  return res;
};
```

## [1431. 拥有最多糖果的孩子](https://leetcode.cn/problems/kids-with-the-greatest-number-of-candies/description/?envType=study-plan-v2&envId=leetcode-75)

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

##

```js

```

##

```js

```

##

```js

```

##

```js

```

##

```js

```

##

```js

```

##

```js

```
