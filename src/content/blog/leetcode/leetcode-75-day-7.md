---
title: LeetCode 75 Day 7 链表
date: 2023-06-14 11:21:57
tags:
  - leetcode
  - leetcode-75
  - algorithm
postSlug: leetcode-75-day-7-linkedlist
---

今天做链表 4 题。

[2095. 删除链表的中间节点](https://leetcode.cn/problems/delete-the-middle-node-of-a-linked-list/?envType=study-plan-v2&envId=leetcode-75)

不知道链表的长度，求 mid 节点。使用一个 dummy head，就不用每次记录 pre。快慢指针一起走，快指针到头时，慢指针为中点。

一开始没用 dummy，直接从第一个开始走，会导致中间节点算错。dummy head 相当于“预备，跑”的预备。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  const dummy = new ListNode();
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
};
```

[328. 奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/?envType=study-plan-v2&envId=leetcode-75)

使用奇偶两个指针，空间 O(1)，时间 O(n)。

偶指针跑的更快，当偶指针存在时，两者交替向后。

然后更新 odd， even 变量指向。最后把偶指针头，接到奇指针后。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  if (!head) return head;

  let odd = head;
  let even = head.next;
  // 保存最初的 even 指针，最后接在后半段
  const evenHead = even;

  // 因为 even 后走（走的更远），所以以 even 来判断跳出条件。
  while (even && even.next) {
    // 先修改指向，再移动变量，方便 even 去接。
    odd.next = even.next;
    odd = odd.next;

    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;

  return head;
};
```

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/?envType=study-plan-v2&envId=leetcode-75)

翻转链表经典题，默写分 4 步。`1->2->3->4->5`

1. 保存下一个节点 2 到 temp
2. 1 cur 指向 pre, 这时是 null
3. 1 cur 改了指向后，它变成 pre
4. 把 temp 拿出来，成为新的 cur

最后返回 pre。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var reverseList = function (head) {
  let temp = null;
  let pre = null;
  let cur = head;

  while (cur) {
    temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }

  return pre;
};
```

[2130. 链表最大孪生和](https://leetcode.cn/problems/maximum-twin-sum-of-a-linked-list/?envType=study-plan-v2&envId=leetcode-75)

一开始想把链表转换成 array，也很简单。但是多了存储空间，和额外的操作时间。

找中点。因为这次长度一定是偶数，所以直接从 head 开始跑。

用栈把前半段保存，过了中点开始，pop 出来，和链表的依次相加比较。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
// 用栈把前半段保存，过了中点开始，pop 出来，和链表的依次相加比较。
var pairSum = function (head) {
  let max = 0;
  const stack = [];

  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    stack.push(slow.val);
    slow = slow.next;
  }

  while (slow) {
    const n = stack.pop();
    max = Math.max(max, n + slow.val);
    slow = slow.next;
  }

  return max;
};
```

明天做树。
