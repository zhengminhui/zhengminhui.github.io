---
title: LeetCode 75 Day 8 二叉树 dfs
date: 2023-06-15 16:39:36
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-8-tree-dfs
---

今天做树，一共 6 题。

[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/?envType=study-plan-v2&envId=leetcode-75)

每一层深度加 1，递归求解。

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
var maxDepth = function (root) {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};
```

[872. 叶子相似的树](https://leetcode.cn/problems/leaf-similar-trees/?envType=study-plan-v2&envId=leetcode-75)

简单题。先 stack 模拟 dfs ，如果是叶子节点，就保存到数组，然后比较两个数组的值。

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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
// dfs 遍历树，用数组记录最下面一层，然后比较返回的叶子数组的值。
var leafSimilar = function (root1, root2) {
  const a = getLeafLevel(root1);
  const b = getLeafLevel(root2);
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

function getLeafLevel(root) {
  const leaf = [];
  const arr = [root];

  while (arr.length) {
    const node = arr.pop();
    if (node.right) {
      arr.push(node.right);
    }
    if (node.left) {
      arr.push(node.left);
    }
    if (!node.left && !node.right) {
      leaf.push(node.val);
    }
  }

  return leaf;
}
```

[1448. 统计二叉树中好节点的数目](https://leetcode.cn/problems/count-good-nodes-in-binary-tree/?envType=study-plan-v2&envId=leetcode-75)

关键点在于 dfs 时，将当前最大值 curMax 作为参数传入。

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
// dfs 递归，记录当前的 curMax，传入递归函数。
var goodNodes = function (root) {
  if (!root) return 0;
  let res = 0;

  function dfs(node, curMax) {
    const { left, right, val } = node;
    if (val >= curMax) {
      res++;
      curMax = val;
    }
    if (left) {
      dfs(left, curMax);
    }
    if (right) {
      dfs(right, curMax);
    }
  }

  dfs(root, root.val);
  return res;
};
```

[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/?envType=study-plan-v2&envId=leetcode-75)

前缀和 + dfs。

map 的 key 是前缀和 p，value 是该前缀和的节点数量。

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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const prefix = new Map();
  let res = 0;

  function dfs(root, p) {
    if (!root) return 0;
    // 检查传入的 p(前缀和) 是否存在，更新 p 出现的次数。
    prefix.set(p, (prefix.get(p) || 0) + 1);

    // 更新截止到当前节点的 sum 值
    const curSum = p + root.val;
    const diff = curSum - targetSum;
    // 如果 diff 出现过，说明这个节点可以满足加和
    res += prefix.get(diff) || 0;

    // 对左右子树继续寻找 当前的 sum 值，在下一回合，这个 sum 值会继续加 node value 并更新。
    dfs(root.left, curSum);
    dfs(root.right, curSum);
    // 退出这个节点了，要撤销掉这个节点。怎么理解？
    // 遍历完一个节点的所有子节点后，将其从 map 中除去，以免影响旁支。
    // 比如，左边的 5 用完了，得把它删掉，避免 map 影响到右边 -3 子树的计算。
    prefix.set(p, prefix.get(p) - 1);
  }
  // 初始的前缀和 0
  dfs(root, 0);
  return res;
};
```

[1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/?envType=study-plan-v2&envId=leetcode-75)

递归 dfs，如果有左边，就用 r+1，更新为 l 的值。在遍历的过程中更新 max。

不用管树是怎么跑的，中断的肯定更新不了 max 值。

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
var longestZigZag = function (root) {
  let max = 0;

  function dfs(node, l, r) {
    max = Math.max(max, l, r);
    if (node.left) {
      dfs(node.left, r + 1, 0);
    }
    if (node.right) {
      dfs(node.right, 0, l + 1);
    }
  }

  dfs(root, 0, 0);
  return max;
};
```

[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/?envType=study-plan-v2&envId=leetcode-75)

如果一个节点等于当前检查的节点，说明当前节点是公共祖先。

找到一个之后层层往上。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

var lowestCommonAncestor = function (root, p, q) {
  if (!root || p === root || q === root) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (!left) return right;
  if (!right) return left;
  return root;
};
```

明天做 BST 和 BFS。
