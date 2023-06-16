---
title: LeetCode 75 Day 9 二叉树 bfs 和 bst
date: 2023-06-16 10:15:12
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-9-tree-bfs-bst
---

今天继续做树，广度优先搜索和二叉搜索树。

[199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/?envType=study-plan-v2&envId=leetcode-75)

思路来自按层级打印二叉树，记录每层级的最后一个值，即右视图。

queue 是保存 node，先进先出，所以用 shift。

更进一步，不用每层都保存，判断 index 是 len -1 时直接 push 进 res，节省空间。

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
 * @return {number[]}
 */

var rightSideView = function (root) {
  if (!root) return [];

  const queue = [root];
  const res = [];
  while (queue.length) {
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      const { left, right, val } = node;
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
      if (i === len - 1) {
        res.push(val);
      }
    }
  }
  return res;
};
```

[1161. 最大层内元素和](https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/?envType=study-plan-v2&envId=leetcode-75)

bfs 的模板题。通过 queue 很 length 来控制 node 进出。

注意节点可能是负数，所以 maxSum 初始值应该是 `-Infinity`，不能是 0。

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
var maxLevelSum = function (root) {
  if (!root) return 0;

  let maxLevel = 0;
  let maxSum = -Infinity;
  let level = 0;
  const queue = [root];
  while (queue.length) {
    let len = queue.length;
    level++;
    let sum = 0;
    while (len) {
      const node = queue.shift();
      const { left, right, val } = node;
      sum += val;
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
      len--;
    }

    if (sum > maxSum) {
      maxLevel = level;
      maxSum = sum;
    }
  }
  return maxLevel;
};
```

[700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/?envType=study-plan-v2&envId=leetcode-75)

简单题，没什么好说的，注意递归要 return。低级错误花好久 debug，今天天气太热了。

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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) return null;
  const { left, right } = root;

  if (root.val === val) {
    return root;
  }
  if (root.val > val) {
    return searchBST(left, val);
  } else if (root.val < val) {
    return searchBST(right, val);
  }
};
```

[450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/?envType=study-plan-v2&envId=leetcode-75)

这题花了点时间，主要是处理删除 target 节点后，他的孩子的抚养问题。

如果没有 root 就返回空，如果当前 root 大于 key，就往左搜索。反之亦然。

如果命中，开始处理。

核心思路是，找到 target 节点的右节点的左叶子节点，这个节点是 target 左节点里最大的，右节点里最小的，就让他做继任者。

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
 * @param {number} key
 * @return {TreeNode}
 */

var deleteNode = function (root, key) {
  if (!root) return null;

  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  }
  if (root.val < key) {
    root.right = deleteNode(root.right, key);
  }
  if (root.val === key) {
    // 如果是叶子节点，直接删掉，返回。
    if (!root.left && !root.right) {
      return null;
    }
    // 如果只有一个孩子，只用返回有的那个。
    if (!root.right) return root.left;
    if (!root.left) return root.right;
    // 如果有两个孩子，先针对这个节点的右孩子，dfs 到左下，也就是右孩子的最小节点。
    let cur = root.right;
    while (cur.left) {
      cur = cur.left;
    }
    // 画一个 6，5，4,3,2 的树，这时 cur 是 3，也就是右子树的左叶节点， 通过递归的方式，把它删掉。
    root.right = deleteNode(root.right, cur.val);
    // 这个节点，比 root.left 所有节点都大，同时又是 root.right 中最小的。
    // 所以就选它做新节点，原先的 right 当他的 right，原先的 left当他的 left。
    cur.right = root.right;
    cur.left = root.left;
    return cur;
  }

  return root;
};
```

接下来准备跳过图，先做后面的。
