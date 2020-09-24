/**
 * 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

假定 BST 有如下定义：

结点左子树中所含结点的值小于等于当前结点的值
结点右子树中所含结点的值大于等于当前结点的值
左子树和右子树都是二叉搜索树
例如：
给定 BST [1,null,2,2],

   1
    \
     2
    /
   2
返回[2].

提示：如果众数超过1个，不需考虑输出顺序

进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
链接：https://leetcode-cn.com/problems/find-mode-in-binary-search-tree

 */

/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/

// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(2);
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
    if (!root) return [];
    const value = {};
    dfs(root, value);
    let result = [];
    let max;
    for (let key in value) {
        if (!max || value[key] > max) {
            max = value[key];
            result = [];
            result.push(key)
            max = value[key]
        }
        if (max === value[key]) {
            result.push(key)
        }
    }
    return result;
};

const dfs = (root, value) => {
    if (!root) return;
    if (!value[root.val]) {
        value[root.val] = 1
    } else {
        value[root.val] += 1
    }
    dfs(root.left, value)
    dfs(root.right, value)

}

//  const a = {a: 1};
//  a['a'] += 2;
 console.log(findMode(root))
