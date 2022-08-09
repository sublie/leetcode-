/*
 * @Description: 二叉树的深度遍历（前序遍历、中序遍历、后序遍历）
 * @Author: huazj
 * @Date: 2022-02-07 18:56:40
 * @LastEditTime: 2022-02-07 19:21:54
 * @LastEditors: huazj
 */

// 定义二叉树
var TreeNode = function(val, left, right) {
    this.val = val === undefined? 0 : val;
    this.left = left === undefined? null : left;
    this.right = right === undefined? null : right;
}

//  前序遍历
var preorderTraversal2 = function(root) {
    let res = [];
    const dfs = function(root) {
        if (root === null) {
            return;
        }
        // 先序遍历从父节点开始
        res.push(root.val);
        // 递归左子树
        dfs(root.right);
        // 递归右子树
        dfs(root.left);
    };
    // ingenious：只使用一个参数 使用闭包进行存储结果
    dfs(root);
    return res;
}
var preorderTraversal = function(root, res = []) {
    if (!root) {
        return res;
    }
    res.push(root.val);
    preorderTraversal(root.left, res);
    preorderTraversal(root.right, res);
    return res;
};

// 中序遍历
var inorderTraversal = function(root, res = []) {
    if (!root) {
        return res;
    }
    inorderTraversal(root.left, res);
    res.push(root.val);
    inorderTraversal(root.right, res);
};

// 后序遍历
var postorderTraversal = function(root, res = []) {
    if (!root) {
        return res;
    }
    postorderTraversal(root.left, res);
    postorderTraversal(root.right, res);
    res.push(root.val);
};