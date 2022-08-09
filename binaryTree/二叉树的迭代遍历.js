/*
 * @Description: 二叉树的迭代遍历（深度遍历）
 * @Author: huazj
 * @Date: 2022-02-07 20:48:08
 * @LastEditTime: 2022-02-08 13:16:07
 * @LastEditors: huazj
 */

// 前序遍历：
// 入栈 右-> 左
// 出栈 中-> 左 -> 右
var preorderTraversal = function(root, res = []) {
    if (!root) {
        return res;
    }
    const stack = [root];
    let cur = null;
    while (stack.length) {
        cur = stack.pop();
        res.push(cur.val);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    }
    return res;
}

// 中序遍历
// 入栈 左 -》 右
// 出栈 左 -》 中 -》 右
var inorderTraversal = function(root, res = []) {
    const stack = [];
    let cur = root;
    while (stack.length || cur) {
        if (cur) {
            stack.push(cur);
            // 左
            cur = cur.left;
        } else {
            // --> 弹出 中
            cur = stack.pop();
            res.push(cur.val);
            //ingenious： 右
            cur = cur.right;
        }
    }
}

// 定义二叉树
var TreeNode = function(val, left, right) {
    this.val = val === undefined? 0 : val;
    this.left = left === undefined? null : left;
    this.right = right === undefined? null : right;
}