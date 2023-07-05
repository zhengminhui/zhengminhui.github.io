---
title: Leetcode Day 2 Dynamic Programming
date: 2023-07-05 10:14:39
draft: false
featured: false
tags:
  - leetcode
  - dynamic programming
  - algorithm
postSlug: leetcode-day-2-dynamic-programming
---

DP 分两个类型，一个是单一维度，通常用一维数组，甚至 1，2 个变量就可以比较。

多维 dp 需要用到二维数组。

注意生成二维数组时不要用 new Array(len).fill([])， 会导致引用相同。

动态规划的本质是穷尽枚举所有可能性，找最优解。

注意使用 memo，减少冗余计算。

dp 的题目，一定要画图，比如编辑距离，最长公共子序列这种。两个字符串，一横一竖，构成一个二维数组。

## Table of contents

## [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

刚开始我想找到中点，双指针向两边比较。然后意识到回文可能不在中间。

用动态规划，分别从每个字符往两边找寻。时间复杂度为 O(n^2)

```js
/**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function (s) {
  if (s.length < 2) return s;

  let maxLen = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    // 回文长度为奇数，aba
    expandAroundCenter(i, i);
    // 长度为偶数，abba
    expandAroundCenter(i, i + 1);
  }

  function expandAroundCenter(left, right) {
    // 左右指针在s上，并且左右相等
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const curLen = right - left + 1;
      if (curLen > maxLen) {
        maxLen = curLen;
        start = left;
      }
      // 满足条件是，向两边扩展
      left--;
      right++;
    }
  }

  return s.substring(start, start + maxLen);
};
```

## [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

```js
/**
 * @param {string} s
 * @return {number}
 */
// stack 记录的是 index
// dp 记录的是，截止当前字符，有效括号的长度
var longestValidParentheses = function (s) {
  const stack = [];
  // len + 1 主要是为了好表示，dp[len] 是 以 len 为长度的有效长度。
  // 下面取 dp[i+1] 也是这个原因。从 base 0 index 转为 base 1的。方便理解。
  const dp = new Array(s.length + 1).fill(0);

  for (let i = 0; i < s.length; i++) {
    // 如果遇到左括号，就把 index 入栈
    // 当前 dp 记录的是，合法的括号长度，因为是左括号，所以是 0
    if (s.charAt(i) === "(") {
      stack.push(i);
      dp[i + 1] = 0;
    } else {
      // 如果遇到右括号，当 stack 内有左括号时，开始计算这段子串的长度。
      if (stack.length > 0) {
        const leftIndex = stack.pop();
        // 1 + i - leftIndex 是子串长度，还要加上之前的合法长度，所以加上 dp[leftIndex]
        const len = 1 + i - leftIndex + dp[leftIndex];
        dp[i + 1] = len;
      } else {
        // 遇到一个孤零零的右括号，不合法，所以是 0.
        dp[i + 1] = 0;
      }
    }
  }
  return Math.max(...dp);
};
```

## [62. 不同路径](https://leetcode.cn/problems/unique-paths/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 两个边的走法都是唯一，所以 dp 数组fill 1，
// 然后从第 1 行 1 列，开始走。
// 右下的走法等于，上+左的走法之和。
var uniquePaths = function (m, n) {
  // 不能 fill 空数组！
  // const dp = new Array(m).fill([]);
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

## [63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii/description/)

注意起始格子是石头的情况。

先走两边，注意判断石头直接拦截一行的情况。所以 dp[i+1][j] 依赖于 dp[i][j]

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */

var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  // 起点和终点都是石头
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;

  const dp = [];
  for (let i = 0; i < m; i++) {
    dp[i] = [];
    for (let j = 0; j < n; j++) {
      // 第一格只有一种走法。
      if (i === 0 && j === 0) {
        dp[i][j] = 1;
      } else if (i === 0) {
        // 在第一行第一列，后方的格子，都依赖前面格子的状态。
        // 如果棋盘是 1，或者前面的 dp 格子是 0，说明过不去了，dp 设为 0.
        dp[0][j] = obstacleGrid[0][j] === 1 || dp[0][j - 1] === 0 ? 0 : 1;
      } else if (j === 0) {
        dp[i][0] = obstacleGrid[i][0] === 1 || dp[i - 1][0] === 0 ? 0 : 1;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        // 当前格子走法等于 上方的+左侧的。
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};
```

## [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

和 62 基本一直。这题采用 in place 计算。在两条边上，直接左到右，上到下累加。从 1，1 开始，是比较左，和上的值，较小的相加。

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        continue;
      } else if (i === 0) {
        grid[i][j] += grid[i][j - 1];
      } else if (j === 0) {
        grid[i][j] += grid[i - 1][j];
      } else {
        grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
      }
    }
  }

  return grid[m - 1][n - 1];
};
```

## [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/?envType=study-plan-v2&envId=top-interview-150)

斐波那契数。

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) return n;

  let pre = 1;
  let lat = 2;
  let res = 0;

  while (n > 2) {
    res = pre + lat;
    pre = lat;
    lat = res;
    n--;
  }
  return res;
};
```

## [72. 编辑距离](https://leetcode.cn/problems/edit-distance/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// 0630： base case ，如果字符相等，需要的步骤等于左上角的步骤。如果不等，取决于上，左，左上的最小值 + 1.
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  // 生成 2 维 dp数组，
  // base case dp[0][0]， 两个都是空字符串，只需 0 步。
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
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
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

## [97. 交错字符串](https://leetcode.cn/problems/interleaving-string/?envType=study-plan-v2&envId=top-interview-150)

注意 dp 数组的长度，应该是 m+1，n+1. 坑了很久。

0，0 位置表示，不用任何字符就完成拼接了。

画一个二维矩阵图，s1，s2 横纵排列对应。

i, j 表示当前长度时，能否拼接成。类似 63 不同路径 2，有障碍物的那题。先走完两个边。

如果左（上）是 true，并且当前字符匹配，当前也是 true。否则是 false。

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */

var isInterleave = function (s1, s2, s3) {
  const m = s1.length;
  const n = s2.length;
  if (s3.length !== m + n) return false;

  const dp = [];
  for (let i = 0; i <= m + 1; i++) {
    dp[i] = [];
    for (let j = 0; j <= n + 1; j++) {
      dp[i][j] = false;
    }
  }
  dp[0][0] = true;

  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }

  // 两条边确定后，变成常规的 dp 题，右下的状态，取决于左边或右边的状态
  // 如果 s3===s1, 检查上方；如果 s3===s2, 检查左侧
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        (dp[i - 1][j] && s3[i + j - 1] === s1[i - 1]) ||
        (dp[i][j - 1] && s3[i + j - 1] === s2[j - 1]);
    }
  }
  return dp[m][n];
};
```

## [118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

dp，把三角想象成一个矩阵的左半边。

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */

var generate = function (numRows) {
  const dp = [];
  dp[0] = [1];
  let n = 1;
  while (n < numRows) {
    dp[n] = [];
    for (let i = 0; i <= n; i++) {
      if (i === 0 || i === n) {
        dp[n][i] = 1;
      } else {
        // 等于上一行头顶上的，加上头顶左边的
        dp[n][i] = dp[n - 1][i] + dp[n - 1][i - 1] || 0;
      }
    }
    n++;
  }
  return dp;
};
```

## [120. 三角形最小路径和](https://leetcode.cn/problems/triangle/?envType=study-plan-v2&envId=top-interview-150)

杨辉三角变种。算是简单题了

注意 j 的判断，需要对 第一个数，和最后一个数特殊处理一下。

其他的按状态转移方程来就行。

最后返回最后一行的最小值。

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */

var minimumTotal = function (triangle) {
  const level = triangle.length;
  if (!level) return 0;
  const top = triangle[0][0];
  if (level === 1) return top;

  const dp = [[top]];

  for (let i = 1; i < level; i++) {
    const row = triangle[i];
    dp[i] = [];
    for (let j = 0; j < row.length; j++) {
      const cur = triangle[i][j];
      if (j === 0) {
        dp[i][j] = cur + dp[i - 1][j];
      } else if (j === row.length - 1) {
        dp[i][j] = cur + dp[i - 1][j - 1];
      } else {
        dp[i][j] = cur + Math.min(dp[i - 1][j - 1], dp[i - 1][j]);
      }
    }
  }
  return Math.min(...dp[level - 1]);
};
```

## [139. 单词拆分](https://leetcode.cn/problems/word-break/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

要用 wordDict 元素拼接处 s。

dp： -1 未计算，0 无法凑出，1 可以凑出.

```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const memo = new Array(s.length + 1).fill(-1);

  function dp(str, i) {
    // 走到最后了，找到了。
    if (str.length === i) {
      return true;
    }
    // 防止冗余计算，如果 memo[i] 计算过，查看他是不是0
    // 0 的话无法凑出，1 的话可以凑出。
    if (memo[i] !== -1) {
      return memo[i] === 1;
    }
    // 从第 0 个字符开始遍历 str，每次增加 1 个长度
    for (let len = 1; i + len <= str.length; len++) {
      const prefix = str.substring(i, i + len);
      // 如果当前 prefix 在字典中存在，转换未可重复子问题。
      if (wordDict.indexOf(prefix) > -1) {
        const subProblem = dp(str, i + len);
        if (subProblem) {
          memo[i] = 1;
          return true;
        }
      }
    }
    memo[i] = 0;
    return false;
  }
  return dp(s, 0);
};
```

## [152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/?envType=study-plan-v2&envId=top-100-liked)

同时记录最大，最小值，存在负负得正的情况

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxPre = nums[0];
  let minPre = nums[0];
  let res = nums[0];
  let maxHere;
  let minHere;

  for (let i = 1; i < nums.length; i++) {
    const cur = nums[i];
    maxHere = Math.max(cur, Math.max(maxPre * cur, minPre * cur));
    minHere = Math.min(cur, Math.min(maxPre * cur, minPre * cur));
    res = Math.max(res, maxHere);
    maxPre = maxHere;
    minPre = minHere;
  }

  return res;
};
```

## [221. 最大正方形](https://leetcode.cn/problems/maximal-square/?envType=study-plan-v2&envId=top-interview-150)

一开始想复杂了，想找左上角为 1，右下角也为 1，然后去递归找两条边是否是 1，

base case

dp[i][j] = 0， 那么当前格子就是 0

dp[i][j] = 1, 这个时候才有更新的前提，

右下角的值，取决于 上，左，和左上的值。

找到状态转移方程，就很简单。

```js
/**
 * @param {character[][]} matrix
 * @return {number}
 */

var maximalSquare = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = [];
  let maxLen = 0;

  // create a dp matrix
  for (let i = 0; i < m; i++) {
    dp[i] = [];
    for (let j = 0; j < n; j++) {
      dp[i][j] = parseInt(matrix[i][j], 10);
      maxLen = Math.max(dp[i][j], maxLen);
    }
  }

  // dp[i][j] = n 表示当前格子边长为 n 的正方形
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (dp[i][j]) {
        dp[i][j] =
          Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) +
          parseInt(matrix[i][j], 10);
        maxLen = Math.max(dp[i][j], maxLen);
      }
    }
  }
  return maxLen * maxLen;
};
```

## [279. 完全平方数](https://leetcode.cn/problems/perfect-squares/?envType=study-plan-v2&envId=top-100-liked)

翻译一下，找尽可能大的完全平方数，这样数量最少，他们加起来和是 n。

dp[0] = 0

dp[i]= i, 全部由 1 构成，3 = 1+1+1

dp[i - j*j]+ 1 除了 1 之外，还由其他的完全平方数构成

n - 1\*1

n - 2\*2

n - 3\*3

n - 4\*4

4 是完全平方数，所以最小值等于 dp[0] + 1 = 1;

Time O(n\*sqrt(n))

```js
/**
 * @param {number} n
 * @return {number}
 */

var numSquares = function (n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    // 最差的情况，全部由 1 构成。
    dp[i] = i;
    // 这里的限定条件 j*j 小于等于 i。只用计算一半。
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp[n];
};
```

## [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/?envType=study-plan-v2&envId=top-interview-150)

默认的最大长度是 1，所以 fill 1。dp 记录的是从开头到此位置的 LIS 长度。

i 指针从 1 开始，dp[0] 是默认值。

j 指针每次从头跑到 i 指针。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// Time O(n^2) Space O(n)
var lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < dp.length; i++) {
    // second pointer from start to current pointer
    for (let j = 0; j < i; j++) {
      // if current larger than previous, update the dp value
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};
```

## [322. 零钱兑换](https://leetcode.cn/problems/coin-change/?envType=study-plan-v2&envId=top-interview-150)

这题记录了迭代和递归两种方法。

迭代就是常规的 dp，穷举所有可能性。

递归就是把问题转化成可重复的子问题。

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 0510note：min(用这枚硬币,不用这枚硬币)
var coinChange = function (coins, amount) {
  const MAX = amount + 1;
  const dp = new Array(MAX).fill(MAX);
  dp[0] = 0;

  for (let i = 1; i < dp.length; i++) {
    for (const coin of coins) {
      // target 比 coin 小
      if (i < coin) {
        continue;
      }
      // 计算 i = 3 块的时候，取决于 3-1， 和 3-2 的最小值, 这里两者相等。
      // 前者是不用这枚硬币的方法，后者是用这枚硬币的方法
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  // 如果最后的值没有修改，说明不存在解
  return dp[amount] === MAX ? -1 : dp[amount];
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeRecur = function (coins, amount) {
  const memo = new Array(amount + 1);

  function dp(coins, amount) {
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    if (memo[amount] !== undefined) return memo[amount];

    let res = Infinity;
    for (const coin of coins) {
      const diff = amount - coin;
      const subProblem = dp(coins, diff);
      // 漏了这句，如果子问题无解，就不用进行 res 的比较。
      if (subProblem === -1) continue;
      // 1 + subProblem 表示在子问题之前，已经拿取了一枚硬币。
      res = Math.min(res, 1 + subProblem);
    }
    memo[amount] = res === Infinity ? -1 : res;
    return memo[amount];
  }
  return dp(coins, amount);
};
```

## [416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/?envType=study-plan-v2&envId=top-100-liked)

转化为背包问题，满足背包 dp[sum / 2]

note0511: dp[0] 的意义，当 target 为 0 时，不用凑数字，也能满足。

但是在这里不存在这个情况，首先数字都是正整数，不存在正负结合。再就是数组长度起码为 1，

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2) return false;
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    // j 需要反向遍历，因为每个数字只能使用一次，
    // 避免之前的结果影响其他结果
    // j 不用到 0， 到 cur 就可以了
    for (let j = target; j >= cur; j--) {
      dp[j] = dp[j] || dp[j - cur];
      // 一旦 target 被满足，就不用执行另一半了。
      // 因为平均数是由总值计算而来，一半就得到了 target，另一半自然也是 target
      if (dp[target]) {
        return true;
      }
    }
  }

  return dp[target];
};
```

## [746. 使用最小花费爬楼梯](https://leetcode.cn/problems/min-cost-climbing-stairs/?envType=study-plan-v2&envId=leetcode-75)

dp[0] 是 0，表示 0 层没有开销

dp[1] 表示爬到第一层的开销。

为了表示 dp[1] 是 cost 第一层，要把 dp 数组错位 1 个，所以是 cost.length + 1。

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

## [790. 多米诺和托米诺平铺](https://leetcode.cn/problems/domino-and-tromino-tiling/?envType=study-plan-v2&envId=leetcode-75)

画图可穷举前 4 种 base case

注意两个 L 对着拼接加一个条装横着放的两种情况

推导公式 dp[i] = dp[i-1]\*2 + dp[i-3]

dp[4] = dp[3] \* 2 + dp[1]

```js
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const mod = 1e9 + 7;
  const dp = new Array(n).fill(1);
  // 画图可穷举前 4 种 base case
  // 最少 1 种
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;
  // 注意两个 L 对着拼接加一个条装横着放的两种情况
  dp[4] = 11;

  for (let i = 5; i <= n; i++) {
    dp[i] = (dp[i - 1] * 2 + dp[i - 3]) % mod;
  }
  return dp[n];
};
```

## [1137. 第 N 个泰波那契数](https://leetcode.cn/problems/n-th-tribonacci-number/description/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

简单题，比 fib 多一个数而已。

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

## [1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

子序列不一定是连续的。

```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 需要画一个二维矩阵图辅助理解。
// dp 的本质是穷举所有情况，所以肯定是 O(n^2),两层 for 循环
// base case: 如果 text1 char(a) 等于 text2 char(b), 则dp[i][j] 等于↖左上方值加1
// 否则不等， 等于←左或者↑上方值的最大值，也就是不新增加
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

## 股票专题

### [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

0516note:之前写的太复杂了。

今天的情况只有两种，今天没有股票 dp_0，今天手里有股票 dp_1

如果今天继续没股票 dp_0 = max(昨天就没有； 昨天手里有，今天卖掉，拿到收益，dp_1+price[i]）

如果今天手里还有股票 dp_1 = max(昨天就有； 昨天没有，今天买了新的股票, 0-price[i])

初始状况:没股票 dp_0 = 0, 有股票，给一个不可知（不可能）的最小值 -infinity

最后肯定是手里没股票出清了收益大，所以返回 dp_0;

```js
/**
 * @param {number[]} prices
 * @return {number}
 */

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

### [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

今天没持有 = max（昨天也没持有，昨天卖了股票）

今天持有了 = max（昨天就持有了，昨天买了股票）

dp_0 = max(dp_0, dp_1 + prices[i])

dp_1 = max(dp_1, dp_0 - prices[i])

base case

dp_0 = 0； dp_1 = 负无穷。

负无穷就是说，第一天就持股，你的收益就是 -prices[0],

只是我们不知道 prices[0] 是多大，所以用一个最小的数来指代。

它只会存在一次，就会被 price[0] 更新。

0705：仔细对比上一题，发现唯一的区别就是计算 dp_1 时，一个是 0 - price, 一个是 dp_0 - price。原因在于上一题只能交易 1 次，所以初始是 0。这一题可以交易多次，所以需要更新 dp_0。

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
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

### [123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/)

和股票 4 一样，把 k 改为 2。

```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
// 和股票 4 一样，把 k 改为 2。
var maxProfit = function (prices) {
  const n = prices.length;
  if (!n) return 0;

  const k = 2;
  // 如果 k 大于数组长度的一半，说明你至多可以一半日子买，一半日子卖，等同于第二题。
  // 不考虑当天买卖的情况，收益为 0
  if (k >= n / 2) {
    // 交易次数 k 没有限制的情况
    return maxProfit_k_inf(prices);
  }
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    // j 是次数，从 0 开始到 k 次。
    for (let j = 0; j <= k; j++) {
      dp[i][j] = [0, -Infinity];
    }
  }

  for (let i = 0; i < n; i++) {
    // j 最少进行 1 次交易，最多 k 次。0 次没有意义。
    for (let j = k; j >= 1; j--) {
      if (i === 0) {
        // 处理 i = 0 第一天时的 base case
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
        continue;
      }
      // 状态转移方程
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }

  return dp[n - 1][k][0];
};

var maxProfit_k_inf = function (prices) {
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

### [188. 买卖股票的最佳时机 IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/)

股票的通用公式题。使用 3 维数组。

```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
// 三个动作，买，卖，hold
// dp[i][k][0|1] 表示当前格子的收益
// 天数，交易次数，是否持股,0不持股
// 找最后一天 dp[n-1][k][0] 的最大值。卖掉股票的收益比持股的更高，所以最后是 0.
// 状态转移方程分两种情况
// 1 我今天没有持有股票
// dp[i][k][0] = max(今天选择休息，    今天选择卖掉)
// dp[i][k][0] = max(dp[i-1][k][0]，dp[i-1][k][1]+price[i])
// 2 今天持有了股票
// dp[i][k][1] = max(今天选择休息，    今天选择买股票)
// dp[i][k][1] = max(dp[i-1][k][1]，dp[i-1][k-1][0]-price[i])
// base case
// dp[-1][k][0] = 0 还没开始时，收益是 0
// dp[-1][k][1] = -1 还没开始时，不会持有股票，收益给个最小值，方便找最大值。
// dp[i][0][0] = 0 交易最大次数为 0，收益也是 0
// dp[i][0][1] = -1 不允许交易，不会持有股票，收益给个最小值，方便找最大值。
// base case：
// dp[-1][...][0] = dp[...][0][0] = 0
// dp[-1][...][1] = dp[...][0][1] = -infinity
var maxProfit = function (k, prices) {
  const n = prices.length;
  if (!n) return 0;

  // 如果 k 大于数组长度的一半，说明你至多可以一半日子买，一半日子卖，等同于第二题。
  // 不考虑当天买卖的情况，收益为 0
  if (k >= n / 2) {
    // 交易次数 k 没有限制的情况
    return maxProfit_k_inf(prices);
  }
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    // j 是次数，从 0 开始到 k 次。
    for (let j = 0; j <= k; j++) {
      dp[i][j] = [0, -Infinity];
    }
  }

  for (let i = 0; i < n; i++) {
    // j 最少进行 1 次交易，最多 k 次。0 次没有意义。
    for (let j = k; j >= 1; j--) {
      if (i === 0) {
        // 处理 i = 0 第一天时的 base case
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
        continue;
      }
      // 状态转移方程
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }

  return dp[n - 1][k][0];
};

var maxProfit_k_inf = function (prices) {
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

### [309. 最佳买卖股票时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

因为包含冷冻期，所以

今天持股的情况是，昨天就持股，今天继续持。

和，前天（也就是 temp 记录的前）的收益-今天股票的价格。

状态转移方程

dp_0 = Math.max(dp_0, dp_1 + prices[i])

dp_1 = Math.max(dp_1, temp - prices[i])

压缩成常数空间

dp_0 = 0; dp_1 = -Infinity; dp_pre_0 = 0;

注意前天不持股的值，需要在遍历时用 temp 保存。

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (!prices.length) return 0;
  let dp_0 = 0;
  let dp_1 = -Infinity;
  let dp_pre_0 = 0;

  for (let i = 0; i < prices.length; i++) {
    // 把昨天不持股的状态记下来。
    const temp = dp_0;
    dp_0 = Math.max(dp_0, dp_1 + prices[i]);
    dp_1 = Math.max(dp_1, dp_pre_0 - prices[i]);
    // 昨天不持股的状态，在下一轮就是前天不持股的数值。
    dp_pre_0 = temp;
  }

  return dp_0;
};
```

### [714. 买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/?envType=study-plan-v2&envId=leetcode-75)

买股票始终记住有两个情况，手上持有股票，和手上不持有股票。

第一天手上就持有股票，意义是，第一天就买了 price[0]的股票，因为不知道 prices[0] 的值是多少，所以给持有成本一个负无穷。

最后肯定是不持有手上没股票了，现金更多。

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
    // 今天不持有，2 cases，1 今天继续不持有，2 昨天持有了，今天要把股票卖了，收入是今天的价格，
    今天不持有 = Math.max(今天不持有, 今天持有 + prices[i]);
    // 今天持有，2 cases， 1今天继续持有，不卖，2，昨天不持有，今天买入，买的同时顺便出手续费
    今天持有 = Math.max(今天持有, 今天不持有 - prices[i] - fee);
  }
  return 今天不持有;
};
```

## 打家劫舍专题

### [198. 打家劫舍](https://leetcode.cn/problems/house-robber/?envType=study-plan-v2&envId=top-interview-150)

打家劫舍经典款。不能连抢两家。

仔细观察，只和 dp[i+1] 和 dp[i+2] 有关，

抢了前面一家，就不能抢当前

不抢前面一家，就可以算上当前

给 nums 头插入两个 0，方便 dp 数组计算。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

var rob = function (nums) {
  if (!nums.length) return 0;

  nums.unshift(0, 0);
  const dp = new Array(nums.length).fill(0);
  // i = 2 才是nums 的开始。
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[nums.length - 1];
};
```

### [213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/)

因为数组变成了环，其实转换成了三种情况

如 [1,2,3,4,5,6,7]

1：去掉收尾不能抢 [2,3,4,5,6]

2：去掉头不抢 [2,3,4,5,6,7]

3：去掉尾不抢 [1,2,3,4,5,6]

只用考虑 2,3 情况，因为这两种情况选择余地更大，数字更多，

由于钱是非负数，选择余地更大，决策结果不会小

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums.length) return 0;
  if (nums.length === 1) return nums[0];

  return Math.max(
    robRange(nums.slice(0, nums.length - 1)),
    robRange(nums.slice(1))
  );
};

// 优化后，使用常数空间，只记录 i+1, i+2
function robRange(nums) {
  if (!nums.length) return 0;
  let i1 = 0;
  let i2 = 0;
  let max = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    max = Math.max(i1, nums[i] + i2);
    i2 = i1;
    i1 = max;
  }
  return max;
}
```

### [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)

分成两种情况，不抢 root, 抢 root

base case: root is null, return [0,0]

状态转移方程：

robRoot = root.val + 不抢左节点+ 不抢右节点;

notRobRoot= max(抢左节点，不抢左节点)+max(抢右节点，不抢右节点)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var rob = function (root) {
  const res = dp(root);
  return Math.max(...res);
};

function dp(root) {
  if (!root) return [0, 0];
  const left = dp(root.left);
  const right = dp(root.right);
  const robRoot = root.val + left[0] + right[0];
  const notRobRoot = Math.max(...left) + Math.max(...right);
  return [notRobRoot, robRoot];
}
```
