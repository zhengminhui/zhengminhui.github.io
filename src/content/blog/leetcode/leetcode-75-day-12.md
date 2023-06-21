---
title: LeetCode 75 Day 12 动态规划二维
date: 2023-06-21 04:18:26
draft: false
featured: false
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-12-dp-two-dimension
---

今天是端午节的前一天，做二维动态规划。

[62. 不同路径](https://leetcode.cn/problems/unique-paths/?envType=study-plan-v2&envId=leetcode-75)

两个边的走法都是唯一，所以 dp 数组 fill 1，

然后从第 1 行 1 列，开始走。

右下的走法等于，上+左的走法之和。

需要注意的是 javascript 不能 fill 空数组！

`const dp = new Array(m).fill([]);`

fill 出来的数组引用相同。

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

var uniquePaths = function (m, n) {
  const dp = [];
  for (let i = 0; i < m; i++) {
    dp[i] = [];
    for (let j = 0; j < n; j++) {
      dp[i][j] = 1;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};
```

[1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/?envType=study-plan-v2&envId=leetcode-75)

需要画一个二维矩阵图辅助理解。

dp 的本质是穷举所有情况，所以肯定是 O(n^2)，两层 for 循环

base case: 如果 text1 char(a) 等于 text2 char(b), 则 dp[i][j] 等于 ↖ 左上方值加 1

否则不等， 等于 ← 左或者 ↑ 上方值的最大值，也就是不新增加

```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */

var longestCommonSubsequence = function (text1, text2) {
  const len1 = text1.length;
  const len2 = text2.length;
  const dp = [];
  // 构建二维数组
  for (let i = 0; i <= len1; i++) {
    dp[i] = [];
    for (let j = 0; j <= len2; j++) {
      dp[i].push(0);
    }
  }
  // 注意 i, j 从 1 开始遍历，方便直观理解长度，但是去 char 时是从 0 开始，所以是 charAt(i-1)
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  return dp[len1][len2];
};
```

[72. 编辑距离](https://leetcode.cn/problems/edit-distance/?envType=study-plan-v2&envId=leetcode-75)

dp[0][0]， 两个都是空字符串，只需 0 步。

base case， word1，2 分别转换为空字符串的步数（要画图理解）。最坏的情况，把一个字符串每个字母都改变，需要的步骤数,'abc'->'ddd'，也就是 1，2，3。

伪代码部分，字符串变化分三种，插入，替换，删除，我们要求的是最小值。

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  // 生成 2 维 dp数组，

  const dp = new Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    dp[i] = new Array(len2 + 1).fill(0);
  }
  // base case， word1，2 分别转换为空字符串的步数（要画图理解）
  // note5016:最坏的情况，把一个字符串每个字母都改变，需要的步骤数是 len,'abc'->'ddd'
  for (let i = 1; i <= len1; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= len2; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      // char equal
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }
  return dp[len1][len2];
};

// 伪代码
function dp(word1, i, word2, j) {
  // if two chars are same, just skip
  // move pointers on step left
  if (word1[i] === word2[j]) {
    return dp(word1, i - 1, word2, j - 1);
  } else {
    // word1 插入一个字符，i 不变，word2 向左移一位。
    const insert = dp(word1, i, word2, j - 1) + 1;
    // 删除一个字符，左移一位，word2 j 不变。
    const del = dp(word1, i - 1, word2, j) + 1;
    // 替换字符，使word1,2 相等，i，j 同时左移一位。
    const replace = dp(word1, i - 1, word2, j - 1) + 1;
    return Math.min(insert, del, replace);
  }
}
```

[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

买股票的两题放在一起整理，一个有手续费，一个没有，本质是一样的。

买股票始终记住有两个情况，

手上持有股票，和手上不持有股票。

第一天手上就持有股票，意义是，第一天就买了 price[0]的股票，因为不知道 prices[0] 的值是多少，所以给持有成本一个负无穷。

最后肯定是不持有手上没股票了，现金更多。

```js
/**
 * @param {number[]} prices
 * @return {number}
 * time O(n) space O(1)
 * find the largest sum of contiguous difference.
 */
// dp_i_0 = max(dp_i_0, dp_i_1 + prices[i])
// dp_i_1 = max(dp_i_1, dp_i_0 - prices[i])
// base case
// dp_i_0 = 0； dp_i_1 = 负无穷。
// 负无穷就是说，第一天就持股，你的收益就是 -prices[0],
// 只是我们不知道 prices[0] 是多大，所以用一个最小的数来指代。
// 它只会存在一次，就会被 price[0] 更新。
var maxProfit = function (prices) {
  if (!prices.length) return 0;
  let dp_i_0 = 0;
  let dp_i_1 = -Infinity;

  for (let i = 0; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i]);
  }
  return dp_i_0;
};
```

[714. 买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/?envType=study-plan-v2&envId=leetcode-75)

和上一题一模一样，多了一个买入时收手续费。

用的中文变量，好理解。

今天不持有，2 cases，1 今天继续不持有，2 昨天（代码里复用今天持有）持有了，今天要把股票卖了，收入是今天的价格，

今天持有，2 cases， 1 今天继续持有，不卖，2，昨天不持有，今天买入，买的同时顺便出手续费

```js
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let 今天不持有 = 0;
  let 今天持有 = -Infinity;

  for (let i = 0; i < prices.length; i++) {
    今天不持有 = Math.max(今天不持有, 今天持有 + prices[i]);

    今天持有 = Math.max(今天持有, 今天不持有 - prices[i] - fee);
  }
  return 今天不持有;
};
```

还剩 15 题，回来继续。
