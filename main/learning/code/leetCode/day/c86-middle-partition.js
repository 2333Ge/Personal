/**
 * 
 * 86. 分隔链表
给你一个链表和一个特定值 x ，请你对链表进行分隔，使得所有小于 x 的节点都出现在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

 

示例：

输入：head = 1->4->3->2->5->2, x = 3
输出：1->2->2->4->3->5
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
  this.toString = function toStr() {
    console.log(this.val);
    return "value" + this.val;
  };
}
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
// head 是分割点的时候？？
var c = function (head, x) {
  let curNode = head;
  while (curNode.next && curNode.next.val < x) {
    curNode = curNode.next;
  }
  const spNode = curNode;
  if(!curNode)return head;
  while (curNode.next) {
    // console.log(curNode.next.val + 'x:' + x);
    if (curNode.next.val < x) {
    let nextNode = curNode.next;
      curNode.next = curNode.next.next;
      nextNode.next = spNode.next.next;
      spNode.next = nextNode;
      // console.log(nodeToString(head))
    }
    curNode = curNode.next;

  }
  return head;
};

function makeNode(arr) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return new ListNode(arr[0]);

  const head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}

function nodeToString(node) {
  if (node) {
    console.log(node.val + ",");
    nodeToString(node.next);
  }
}

console.log(nodeToString(c(makeNode([1, 4, 3, 2, 5, 2]), 3)));
// console.log(nodeToString(makeNode([1, 4, 3, 2, 5, 2])));
