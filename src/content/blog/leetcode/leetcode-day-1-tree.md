---
title: Leetcode Day 1 Tree
date: 2023-06-29 09:32:03
draft: false
featured: false
tags:
  - leetcode
  - algorithm
  - tree
postSlug: leetcode-day-1-tree
---

Tree 门类，一共 32 道题。

总结一下，树的遍历主要分前序遍历，中序遍历，后序遍历，dfs 使用 stack 深度优先遍历，bfs 使用 queue 广度优先遍历。

大概不出这几项。

## Table of contents

## [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

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
// 和检查二叉树思路一样。
// bst中序遍历就是从小到大的排列的顺序。
var inorderTraversal = function (root) {
  if (!root) return [];
  const stack = [];
  const res = [];
  while (root || stack.length) {
    // 先到最左叶子节点
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversalRecur = function (root) {
  const res = [];
  recur(root);

  function recur(node) {
    if (!node) return null;
    recur(node.left);
    res.push(node.val);
    recur(node.right);
  }
  return res;
};
```

## [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // stack iteration, dfs 到左下角
  // 用最小值去比较，然后更新最小值。
  // 没必要记录 order 数组，也没必要第二次遍历比较。
  if (!root) return true;
  const stack = [];
  let min = -Infinity;

  while (stack.length || root) {
    // 先到最左叶子节点
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    // BST 中序遍历 一定是单调递增的
    if (root.val <= min) {
      return false;
    }
    min = root.val;
    root = root.right;
  }

  return true;
};

// 递归的方法，传入无穷大无穷小，开始依次检查左右孩子节点。
// 对于左子树，自身是 upper bound，对于右子树，自身是 lower bound
var isValidBSTRecur = function (root) {
  return checkRoot(root, -Infinity, Infinity);
};

function checkRoot(root, lower, upper) {
  if (!root) return true;
  const { val, left, right } = root;
  if (val <= lower || val >= upper) {
    return false;
  }
  return checkRoot(left, lower, val) && checkRoot(right, val, upper);
}
```

## [100. 相同的树](https://leetcode.cn/problems/same-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 如果任意一个是 null，要保证两个相同
// 如果值不同，返回 false，然后递归检查左右子树。
var isSameTree = function (p, q) {
  if (!p || !q) {
    return p === q;
  }
  if (p.val !== q.val) {
    return false;
  }
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

## [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/?envType=study-plan-v2&envId=top-interview-150)

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
 * @return {boolean}
 * Iteratively: Use a stack and push [left.left,right.right] and [left.right, right.left] in pairs
 */
// 迭代，两两入栈。递归，分别传入。
// 和100相同的树类似。
var isSymmetric = function (root) {
  if (!root) return true;
  const stack = [root.left, root.right];
  // 一次入栈一对，再弹出一对
  while (stack.length) {
    const right = stack.pop();
    const left = stack.pop();
    // one of nodes is null
    if (!right || !left) {
      if (right !== left) {
        return false;
      }
      // 如果两个都是null，则继续到下一轮检查。
      continue;
    }
    if (right.val !== left.val) return false;

    stack.push(left.left);
    stack.push(right.right);
    stack.push(left.right);
    stack.push(right.left);
  }
  return true;
};

// 递归做法。
var isSymmetricRecur = function (root) {
  if (!root) return true;
  const { left, right } = root;
  if (!left || !right) {
    return left === right;
  }
  if (left.val !== right.val) {
    return false;
  }
  return isSame(left, right);
};

var isSame = function (p, q) {
  if (!p || !q) {
    return p === q;
  }
  if (p.val !== q.val) {
    return false;
  }
  return isSame(p.left, q.right) && isSame(p.right, q.left);
};
```

## [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/?envType=study-plan-v2&envId=top-interview-150)

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
 * @return {number[][]}
 */
// 关键点在于，通过数组长度，记住当前层级有多少个节点
var levelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const order = [];

  while (queue.length) {
    const level = [];
    let len = queue.length;
    while (len) {
      const node = queue.shift();
      const { val, left, right } = node;
      level.push(val);
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
      len -= 1;
    }
    order.push(level);
  }
  return order;
};
```

## [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @return {number[][]}
 */
// 层序遍历通常用 queue，先进先出。
// 判断这一行是正序还是逆序，用一个 count 标记。
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];
  let count = 0;

  while (queue.length) {
    let len = queue.length;
    const level = [];

    while (len) {
      const { val, left, right } = queue.shift();
      level.push(val);
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
      len--;
    }
    if (count % 2) {
      res.push(level.reverse());
    } else {
      res.push(level);
    }
    count++;
  }
  return res;
};
```

## [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// 当 root 为 null 时，depth 为 0. 每走一层，深度+1。
var maxDepth = function (root) {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};
```

## [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 递归的思路
// 前序： 根，左，右
// 中序： 左，中，右
// 根据前序，找到root，根据root的值在中序找到对应的index，
// 将数组分为左和右两部分
// 画树和数组的图
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }
  const val = preorder[0];
  const index = inorder.indexOf(val);

  //  index 为界，inorder左部分
  const inLeft = inorder.slice(0, index);
  //  index 为界，inorder右部分
  const inRight = inorder.slice(index + 1);
  //  root 之后，preorder左部分， 截取长度等同 inLeft
  const preLeft = preorder.slice(1, 1 + inLeft.length);
  //  preLeft 之后，preorder右部分， 截取长度是从左部分之后到队尾
  const preRight = preorder.slice(1 + inLeft.length);

  const root = new TreeNode(val);
  root.left = buildTree(preLeft, inLeft);
  root.right = buildTree(preRight, inRight);
  return root;
};
```

## [106. 从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
// 和前一题一模一样，就是通过后续的最后一位找 root 节点。
// 画一下数组的图。后序的最后一个是 root，然后再中序去找对应的 index
// 然后把中序按 左，root， 右切分。
// 然后把后续按，左的长度，右的长度，root 切分，然后递归拼接。
var buildTree = function (inorder, postorder) {
  const val = postorder[postorder.length - 1];
  if (val === undefined) return null;

  const index = inorder.indexOf(val);

  const inLeft = inorder.slice(0, index);
  const inRight = inorder.slice(index + 1);

  const postLeft = postorder.slice(0, inLeft.length);
  const postRight = postorder.slice(inLeft.length, postorder.length - 1);

  const node = new TreeNode(val);
  node.left = buildTree(inLeft, postLeft);
  node.right = buildTree(inRight, postRight);

  return node;
};
```

## [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

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
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 先判断奇偶，找中点。然后递归左段和右段。
var sortedArrayToBST = function (nums) {
  const mid = nums.length % 2 ? (nums.length - 1) / 2 : nums.length / 2;
  const val = nums[mid];
  // val 可能为 0，有点小坑，所以检查是否为 undefined
  if (val === undefined) return null;

  const root = new TreeNode(val);
  const left = nums.slice(0, mid);
  const right = nums.slice(mid + 1);

  root.left = sortedArrayToBST(left);
  root.right = sortedArrayToBST(right);

  return root;
};
```

## [112. 路径总和](https://leetcode.cn/problems/path-sum/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @return {boolean}
 */
// dfs 递归，每次递的过程，更新 target
// 成功的条件是 target 为 0，并且没有左右节点了，到底了，才行。
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  return recur(root, targetSum);
};

function recur(root, target) {
  if (!root) return false;

  const { val, left, right } = root;
  target -= val;

  if (!target && !left && !right) {
    return true;
  }

  return recur(left, target) || recur(right, target);
}
```

## [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 先拉平左右子树，然后把右子树衔接到左子树下方
// 0628：先把左子树挂在根的右边，再把右子树挂在新的最右下节点之后。
var flatten = function (root) {
  if (!root) return;
  // 递归分别展开左右子树
  flatten(root.left);
  flatten(root.right);

  // 把展开的链表暂存到两个变量
  const left = root.left;
  const temp = root.right;
  // 画图理解，root 的左边不要了，
  // 上面的左链表挂在 root 的右边，右边暂存
  root.left = null;
  root.right = left;

  // 开始处理保存的右链表
  // 让一个指针回到 root 节点，然后从头遍历到尾，把 temp(right) 接到队尾。
  // 为什么需要这么做？
  // 因为 p 先接了 left，要找到新的队尾。
  let p = root;
  while (p.right) {
    p = p.right;
  }
  p.right = temp;
};
```

## [116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)

```js
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// 假想成一棵三叉树，来解决连接中间间隙的问题。
// 这题不是题库里的，但是也放进来一起整理。
var connect = function (root) {
  if (!root) return null;
  traverse(root.left, root.right);
  return root;
};

function traverse(node1, node2) {
  // 如果有一方为空，则不进行操作。没地方连。
  if (!node1 || !node2) return;

  node1.next = node2;

  traverse(node1.left, node1.right);
  traverse(node2.left, node2.right);
  // 连接左树右子 和 右树左子
  traverse(node1.right, node2.left);
}
```

## [117. 填充每个节点的下一个右侧节点指针 II](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

```js
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// 想按 116 的递归来写，没解决跨位联接的问题，
// 更优的方法，不用重复入队出队，把每一层级看成一个链表。一次遍历，常数空间。
// 两个指针，一个是 cur，用来遍历树，一个 dummy，用来穿针引线
var connect = function (root) {
  if (!root) return null;
  let cur = root;

  // cur 可以看做每一层的链表
  while (cur) {
    // 每一层建立一个 dummy 节点，串起该层
    const dummy = new Node();
    let pre = dummy;
    // 开始遍历这一层
    while (cur) {
      // 如果有左右节点，就让 pre 穿过这两个节点
      if (cur.left) {
        pre.next = cur.left;
        pre = pre.next;
      }
      if (cur.right) {
        pre.next = cur.right;
        pre = pre.next;
      }
      // 访问该层的下一节点
      cur = cur.next;
    }
    // 这一层遍历完，继续往下走，直到 cur 为空时为止。
    // 这里要解释下，为什么 cur = dummy.next 能到下一行。
    // 用题图解释，cur 是第一行的节点 1，dummy 和 pre 是第二行的头，也就是 2, 3 的左边。
    // 当对 cur 1 遍历时，是使用 pre 去穿过 2,3。
    // 当 cur 遍历完了，cur 赋值为 dummy.next，也就是第二行的第一个，也就是 2 了，至此，完成了向下一行的变化。
    cur = dummy.next;
  }
  return root;
};

// 尝试用层序遍历的方式来做
var connectBFS = function (root) {
  if (!root) return null;
  const queue = [root];

  while (queue.length) {
    let len = queue.length;

    // 创建一个 pre 节点
    let pre = new Node(null);
    while (len) {
      const node = queue.shift();
      // 如果 pre 是 null，说明是头节点。如果不是，说明可以连接当前节点。
      if (pre !== null) {
        pre.next = node;
      }
      pre = node;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      len--;
    }
  }
  return root;
};
```

## [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
var maxPathSum = function (root) {
  let maxSum = -Infinity;

  function dfs(root) {
    if (!root) return 0;

    // dfs 返回的是一个 sum 值
    const left = dfs(root.left);
    const right = dfs(root.right);

    // 当前节点为根的子树 的 路径和（总和）
    const subtreeSum = left + root.val + right;
    maxSum = Math.max(maxSum, subtreeSum);

    // 当前节点 能对外提供的 最大和
    // 0526note：这里卡了很久，为什么 max（0，左，右）因为路径 dfs 要么选左，要么选右，要么不选，三选一。
    const dfsSum = root.val + Math.max(0, left, right);
    // 如果对外提供的路径和为负，直接返回0。否则正常返回
    return dfsSum < 0 ? 0 : dfsSum;
  }

  dfs(root);

  return maxSum;
};
```

## [129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// 0629 dfs 有点感觉了，mid 一把过
var sumNumbers = function (root) {
  let res = 0;

  function dfs(node, str) {
    if (!node) return;
    const { val, left, right } = node;
    str += "" + val;
    // 当到叶子节点时，开始转换
    if (!left && !right) {
      res += parseInt(str, 10);
    }
    dfs(node.left, str);
    dfs(node.right, str);
  }

  dfs(root, "");
  return res;
};
```

## [173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 */
// 简单题了感觉，直接把 root 中序遍历，存在数组里，然后维护index指针
var BSTIterator = function (root) {
  this.index = -1;
  const order = [];

  function dfs(node) {
    if (!node) return;
    const { left, right, val } = node;
    if (left) {
      dfs(left);
    }
    order.push(val);
    if (right) {
      dfs(right);
    }
  }

  dfs(root);
  this.inorder = order;
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  this.index++;
  return this.inorder[this.index];
};

/**
 * @return {boolean}
 */
// has next 是指至少在倒数第二个
BSTIterator.prototype.hasNext = function () {
  return this.index < this.inorder.length - 1;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
```

## [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// 思路来自按层级打印二叉树，记录没层级的最后一个值，即右视图。
// queue 是保存 node，先进先出，所以用 shift
// 0615：不用每层都保存，判断 index 是 len -1 时直接 push 进 res
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

## [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// 只有最底层不满，通过 dfs 遍历肯定可以算出结果。但是这样遍历的全部节点，不够高效。
// 通过计算高度的方式，可以节省时间。
var countNodes = function (root) {
  if (!root) return 0;

  let leftH = 0;
  let rightH = 0;
  let leftNode = root;
  let rightNode = root;

  // 计算左子树的高度，因为左边肯定是填满的。
  while (leftNode) {
    leftH++;
    leftNode = leftNode.left;
  }
  // 计算右侧高度
  while (rightNode) {
    rightH++;
    rightNode = rightNode.right;
  }

  // 满二叉树, 两层的 2^2 -1 =3， 三层的 2^3 -1=7.
  if (leftH === rightH) {
    return 2 ** leftH - 1;
  }
  // 不满的通过递归计算
  return 1 + countNodes(root.left) + countNodes(root.right);
};
```

## [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @return {TreeNode}
 */
// 递归做法，思路类似两个变量互换。
var invertTree = function (root) {
  if (!root) return null;

  invertTree(root.left);
  invertTree(root.right);

  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;
  return root;
};
```

## [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
 * @param {number} k
 * @return {number}
 */
// bst的中序遍历即是升序，记录一个序数rank，
// 当 rank 为k时，即是第k小的数。
var kthSmallest = function (root, k) {
  let res = -1;
  let rank = 0;

  function dfs(root, k) {
    if (!root) return;

    dfs(root.left, k);
    rank++;
    const { val } = root;
    if (rank === k) {
      res = val;
      return;
    }
    dfs(root.right, k);
  }

  dfs(root, k);
  return res;
};
```

## [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// 如果任意一个节点等于当前检查的节点，说明当前节点是公共祖先
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

## [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

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
// HashMap的key是前缀和， value是该前缀和的节点数量
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

## [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

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
// 如果没有 root 就返回空，如果当前 root 大于 key，就往左搜索。
// 如果命中，开始处理。
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
    // 如果有两个孩子，以示例 1 为例，但是 4 左下多加一个 3.5 。
    // [5,3,6,2,4,null,7,null,null,3.5]
    // 要把 3 删掉。我们不能立刻删掉他，需要做一些修补工作
    // 找到 3 后，先针对这个节点的右孩子 4，dfs 到左下，也就是右孩子的最小节点。
    // root 是 3，cur 是 4
    let cur = root.right;
    // 假想 4 左下如果有个 3.5，就会遍历到 3.5，然后把 3.5 删掉。
    while (cur.left) {
      cur = cur.left;
    }
    // 到这里，cur 是 3.5
    // 也就是右子树的左叶节点， 通过递归的方式，把它删掉。
    // 3的右子树变成，没有 3.5 的子树。
    root.right = deleteNode(root.right, cur.val);
    // 这个 3.5 节点，比 root.left 所有节点都大，同时又是 root.right 中最小的。
    // 所以就选它做新节点，原先的 right 当他的 right，原先的 left当他的 left。
    cur.right = root.right;
    cur.left = root.left;
    return cur;
  }

  return root;
};
```

## [530. 二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// BST 的最小差值，只能在相邻两个数值中产生
// 注意不一定是相邻节点，有可能一个在左子树最右，一个在右子树最左。
// 中序遍历，有一个递增的数组，在递增数组中找差值，牺牲一点空间
var getMinimumDifference = function (root) {
  if (!root) return 0;
  const arr = [];
  let min = Infinity;

  function dfs(root) {
    if (!root) return;
    const { val, left, right } = root;
    if (left) {
      dfs(left);
    }
    arr.push(val);
    if (right) {
      dfs(right);
    }
  }

  dfs(root);
  for (let i = 0; i < arr.length - 1; i++) {
    min = Math.min(min, arr[i + 1] - arr[i]);
  }
  return min;
};
```

## [543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-100-liked)

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
// note0518: 在计算深度的过程中计算直径，最大直径 = 最大的左深度+最大的右深度，
// 注意这里的最大左右深度，可能是子树的，不一定穿过根节点。
// note0628: 要算最大直径，肯定要穷举左右节点，所以通过计算深度这个抓手。
var diameterOfBinaryTree = function (root) {
  let diameter = 0;

  function getDepth(root) {
    if (!root) return 0;
    const leftDep = getDepth(root.left);
    const rightDep = getDepth(root.right);
    diameter = Math.max(diameter, leftDep + rightDep);
    // 要调用leftDep 变量，否则会超时。
    return Math.max(leftDep, rightDep) + 1;
  }

  getDepth(root);
  return diameter;
};
```

## [637. 二叉树的层平均值](https://leetcode.cn/problems/average-of-levels-in-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dtop-interview-150)

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
// 层序遍历变体，和zigzag 打印一样，记录 sum，然后求平均。
var averageOfLevels = function (root) {
  if (!root) return [0];
  const queue = [root];
  const res = [];
  while (queue.length) {
    const len = queue.length;
    let sum = 0;
    let i = 0;
    while (i < len) {
      const { left, right, val } = queue.shift();
      sum += val;
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
      i++;
    }
    res.push(sum / len);
  }
  return res;
};
```

## [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

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
// 注意递归要 return fn，低级错误花好久 debug，天气太热了。
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

## [872. 叶子相似的树](https://leetcode.cn/problems/leaf-similar-trees/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

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
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

// 用 stack 遍历，先右后左，这样是拿到从左到右的顺序。
function getLeafLevel(root) {
  const leaf = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    const { left, right, val } = node;
    if (right) {
      stack.push(right);
    }
    if (left) {
      stack.push(left);
    }
    if (!left && !right) {
      leaf.push(val);
    }
  }

  return leaf;
}
```

## [1161. 最大层内元素和](https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

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
// maxSum 的初始值要是 负无穷，节点可能是负数。
// 对空间没要求，就把层和都存起来，有要求，就用一个负无穷初始化，更大就更新这个变量。
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
      const { left, right, val } = queue.shift();
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

## [1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

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
// 递归 dfs，如果有左孩子，就继续往左走，用 r+1，更新为 l 的值。同时在遍历的过程中更新 max。
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

## [1448. 统计二叉树中好节点的数目](https://leetcode.cn/problems/count-good-nodes-in-binary-tree/?envType%253Dstudy-plan-v2%2526envId%253Dleetcode-75)

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
// dfs 递归，记录当前的 curmax，传入递归函数。
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
