/*
 * @Description: 二叉树的深度遍历（前序遍历、中序遍历、后序遍历）
 * @Author: huazj
 * @Date: 2022-02-07 18:56:40
 * @LastEditTime: 2022-02-07 19:21:54
 * @LastEditors: huazj
 */

// 定义二叉树
var TreeNode = function (val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
};

//  前序遍历
var preorderTraversal2 = function (root) {
  let res = [];
  const dfs = function (root) {
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
};
var preorderTraversal = function (root, res = []) {
  if (!root) {
    return res;
  }
  res.push(root.val);
  preorderTraversal(root.left, res);
  preorderTraversal(root.right, res);
  return res;
};

// 中序遍历
var inorderTraversal = function (root, res = []) {
  if (!root) {
    return res;
  }
  inorderTraversal(root.left, res);
  res.push(root.val);
  inorderTraversal(root.right, res);
};

// 后序遍历
var postorderTraversal = function (root, res = []) {
  if (!root) {
    return res;
  }
  postorderTraversal(root.left, res);
  postorderTraversal(root.right, res);
  res.push(root.val);
};

let levelTraversal = function (root, res = []) {
  // 层序遍历二叉树
  let bfs = function (node, level) {
    if (node == null) 
      return ;
    
    (res[level] = res[level] ?? []).push(node.val) ;
    bfs(node.left, level + 1) ;
    bfs(node.right, level + 1) ;
    return ;
  } ;
  // 数组扁平化
  // 1.递归处理
  let recursiveFlat = (() => function (arr) {
        // ==================解决子问题的思想=================
    // let newarr = [], 
    //   flag = false ;
    // for (let i = 0; i < arr.length; i++) {
    //   if (Array.isArray(arr[i])) {
    //     const subarr = recursiveFlat(arr[i]) ;
    //     if (subarr.length==2&&subarr[0]==4) debugger;
    //     newarr.push(...subarr) ;
    //     flag = true ;
    //   } else newarr.push(arr[i]) ;
    // }
    // if(!flag) 
    //   return arr ;
    // return newarr ;

        // ====================遍历思想=================
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        recursiveFlat(arr[i]) ;
      } else newarr.push(arr[i]) ;
    }
    return newarr ;
  })(newarr = []) ;
  
  bfs(root, 0) ;
  return recursiveFlat(res) ;
};