/**
 * 2020-09-16
 * 翻转一棵二叉树。

示例：

输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

链接：https://leetcode-cn.com/problems/invert-binary-tree

 */

/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    if(!root) return root;
    var newTree = new TreeNode(root.val);
    dfs(root, newTree)
    return newTree;
};

var dfs = function (root, cur) {
    if (!root) return;
    if (root.left) {
        const newT = new TreeNode(root.left.val);
        cur.right = newT;
        dfs(root.left, cur.right);
    }
    if (root.right) {
        const newT = new TreeNode(root.right.val);
        cur.left = newT;
        dfs(root.right, cur.left);
    }
}