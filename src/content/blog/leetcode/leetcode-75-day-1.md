---
title: LeetCode 75 Day 1 数组和字符串
date: 2023-06-06 14:56:14
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-1-array-string
---

昨天把 leetcode top 100 liked 题库刷完了。今天开始做 top 75，每天 3-5 题，考虑到这个月有端午节，回家几天会有中断，预计下月初做完。顺序就按照题库的门类来，每道题主要写下思路和需要注意的点，力求简单，持之以恒。

今天的大类是数组/字符串。

[1768. 交替合并字符串](https://leetcode.cn/problems/merge-strings-alternately/?envType=study-plan-v2&envId=leetcode-75)

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

[1071. 字符串的最大公因子](https://leetcode.cn/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75)

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

[605. 种花问题](https://leetcode.cn/problems/can-place-flowers/?envType=study-plan-v2&envId=leetcode-75)

大致思路不难，时间 O(n)。有两个 corner case 需要注意。

遍历数组，主要考虑 2 点：

1. 如果 i 位置有花，向前两格。
2. 如果 i 位置没花，分两种情况
   1. `flowerbed[i+1]` 也没花，可以放心种。
   2. i 是最后一个位置了，也可以放心种。因为前面过来的情况，在考虑 2-1 的情况下，都是合法的。

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

[345. 反转字符串中的元音字母](https://leetcode.cn/problems/reverse-vowels-of-a-string/?envType=study-plan-v2&envId=leetcode-75)

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

明日继续。
