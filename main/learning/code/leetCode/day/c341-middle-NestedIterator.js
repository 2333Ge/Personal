/**
 * 给你一个嵌套的整型列表。请你设计一个迭代器，使其能够遍历这个整型列表中的所有整数。

列表中的每一项或者为一个整数，或者是另一个列表。其中列表的元素也可能是整数或是其他列表。

链接：https://leetcode-cn.com/problems/flatten-nested-list-iterator
示例 1:

输入: [[1,1],2,[1,1]]
输出: [1,1,2,1,1]
解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。
示例 2:

输入: [1,[4,[6]]]
输出: [1,4,6]
解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。

 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function (nestedList) {
  this.curIndex = -1;
  if (nestedList && nestedList.length > 0) {
    this.curIndex = 0;
  }
  this.stack = [];
  const initData = (index, data) => {
    if (!data || index >= data.length) return;
    const item = data[index];
    if(item === undefined) return;
    if (typeof item === "number") {
      this.stack.push(item);
      initData(index + 1, data);
    } else {
      initData(0, item);
      initData(index + 1, data);
    }
  };
  initData(0, nestedList);
};

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function () {
  return 0 <= this.curIndex && this.curIndex < this.stack.length;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function () {
  const result = this.stack[this.curIndex];
  this.curIndex++;
  return result;
};

const test = () => {
  const a = new NestedIterator([[1,1],2,[1,1]]);
  const result = [];
  while (a.hasNext()) {
    result.push(a.next());
  }
  console.log(result);
  // console.log(a.curIndex);

};

test();
