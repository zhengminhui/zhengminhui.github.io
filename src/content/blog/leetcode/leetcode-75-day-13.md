---
title: LeetCode 75 Day 13 位运算和前缀树
date: 2023-06-26 14:07:47
draft: true
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-13-bit-and-trie
---

今天从湖南回来，慢慢找回感觉。

[338. 比特位计数](https://leetcode.cn/problems/counting-bits/?envType=study-plan-v2&envId=leetcode-75)

有点 dp 的感觉，arr[i] 取决于 arr[i 右移 1 位的数]，再加上 最后一位和 1 的按位与。

5 等于： 5 >> 1 = 2， 2 的 bit 有 1 个 1，再加上 5 自己的最后一个 1

```js
/**
 * @param {number} num
 * @return {number[]}
 */

var countBits = function (num) {
  const arr = new Array(num + 1).fill(0);

  for (let i = 1; i <= num; i++) {
    arr[i] = arr[i >> 1] + (i & 1);
  }

  return arr;
};
```

[136. 只出现一次的数字](https://leetcode.cn/problems/single-number/?envType=study-plan-v2&envId=leetcode-75)

使用异或，n 异或 n 为 0， 2^2 = 0

0 ^ n = n

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

var singleNumber = function (nums) {
  let single = 0;
  for (const n of nums) {
    single ^= n;
  }
  return single;
};
```

[1318. 或运算的最小翻转次数](https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/?envType=study-plan-v2&envId=leetcode-75)

翻译一下，要满足 a|b = c。

每个数先和 1 按位与，找到最右的数。 tc means temp c。

如果各自最右的数满足公式，这一位就可以略过。

如果不满足

如果 tc 不是 0，是 1，说明 ta, tb 没法 异或成 1（因为没满足公式嘛），所以两个都是 0，这时翻转任意 1 个就行，所以 res 加 1

如果 tc 是 0， 同样因为公式没满足，所以 ta,tb 异或为 1，分两种情况，如果两个都是 1，这个时候就要两步，分别对 ta,tb 操作，所以 res + 2，如果 ta 1 tb 0, 就只需要对 ta 翻转就可以了，res +1。 这种情况下 ta tb 不可能同时为 0，因为两个 0 不可能异或成 1.

这一轮算完以后，各自右移一位。

直到所有数字都为 0，才算计算完成。

```js
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */

var minFlips = function (a, b, c) {
  let res = 0;
  while (a || b || c) {
    let tc = c & 1;
    let tb = b & 1;
    let ta = a & 1;
    // 注意这里 异或优先级 低于 不等于，所以要加括号。
    if ((ta | tb) !== tc) {
      if (tc === 0) {
        res += ta === tb ? 2 : 1;
      } else {
        res += 1;
      }
    }
    c = c >> 1;
    b = b >> 1;
    a = a >> 1;
  }
  return res;
};
```

[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/?envType=study-plan-v2&envId=leetcode-75)

nodes= nodes[char] 相当于 json 进入更深的一层

{ a : { p : { p: { l: { e: { isEnd: true}}}}}}

如果没有字符，就创建一个 kv object，结束是加一个 boolean 值。

这样就能判断 apple 和 app 的区别。

```js
var Trie = function () {
  this.children = {};
};

/**
 * @param {string} word
 * @return {void}
 */

Trie.prototype.insert = function (word) {
  let nodes = this.children;
  for (const char of word) {
    if (!nodes[char]) {
      nodes[char] = {};
    }
    nodes = nodes[char];
  }
  nodes.isEnd = true;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
// 方便 startsWith 和 search 调用。
Trie.prototype.searchPrefix = function (prefix) {
  let nodes = this.children;
  for (const char of prefix) {
    if (!nodes[char]) {
      return false;
    }
    nodes = nodes[char];
  }
  return nodes;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const node = this.searchPrefix(word);
  return node && Boolean(node.isEnd);
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  return this.searchPrefix(prefix);
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```

[1268. 搜索推荐系统](https://leetcode.cn/problems/search-suggestions-system/?envType=study-plan-v2&envId=leetcode-75)

先把 products 排序

然后开始遍历关键词，在遍历内部检查 products，如果关键词的 char 和 p 的 char 一致，就保存 p。

```js
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */

var suggestedProducts = function (products, searchWord) {
  const res = [];
  products.sort();

  for (let i = 0; i < searchWord.length; i++) {
    const temp = [];
    products.forEach(p => {
      if (p[i] === searchWord[i]) {
        temp.push(p);
      }
    });
    // 这里用搜索出来的的结果更新 products，减少数据量
    products = temp;
    // 只取前 3 个，不足的就直接返回。
    res.push(products.slice(0, 3));
  }
  return res;
};
```
