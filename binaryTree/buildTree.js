// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/** 待优化：slice()方法也会消耗性能，可以直接操作数组的索引
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// var buildTree = function(preorder, inorder) {
//     if (preorder.length <= 0)
//         return null ;

//     const rootVal = preorder.shift() ,
//         rootNode = new TreeNode(rootVal) ;
//     let rootIndex = inorder.findIndex((item) => item==rootVal),
//         leftPreorder = preorder.slice(0,rootIndex),
//         rightPreorder = preorder.slice(rootIndex),
//         leftInorder = inorder.slice(0,rootIndex),
//         rightInorder = inorder.slice(rootIndex+1) ;
//     console.log('leftPreorder = ', leftPreorder) ;
//     console.log('leftInorder = ', leftInorder) ;
//     console.log('rightPreorder = ', rightPreorder) ;
//     console.log('rightInorder = ', rightInorder) ;
//     rootNode.left = buildTree(leftPreorder, leftInorder) ;
//     rootNode.right = buildTree(rightPreorder, rightInorder) ;
//     return rootNode ;
// };
/** 优化：slice()方法也会消耗性能，可以直接操作数组的索引
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length <= 0) return null;

  return buildTree(0, preorder.length, 0, inorder.length);

  function buildTree(preStart, preEnd, inStart, inEnd) {
    // note：递归不变量决定结束条件（这里是左闭右开）
    if (inStart === inEnd) {
      return null;
    }
    const rootVal = preorder[preStart],
      rootNode = new TreeNode(rootVal);
    let rootIndex = inorder.findIndex((item) => item == rootVal),
      leftLen = rootIndex - inStart;
    let left = {
        preorderStart: preStart + 1,
        preorderEnd: preStart + 1 + leftLen,
        inorderStart: inStart,
        inorderEnd: rootIndex,
      },
      right = {
        preorderStart: preStart + 1 + leftLen,
        preorderEnd: preEnd,
        inorderStart: rootIndex + 1,
        inorderEnd: inEnd,
      };
    // let   leftPreorder = preorder.slice(left.preorderStart,left.preorderEnd),
    //   leftInorder = inorder.slice(left.inorderStart,left.inorderEnd),
    //   rightPreorder = preorder.slice(right.preorderStart,right.preorderEnd),
    //   rightInorder = inorder.slice(right.inorderStart,right.inorderEnd) ;
    // console.log('-----------------------------------------');
    // console.log('leftPreorder = ', leftPreorder) ;
    // console.log('rightPreorder = ', rightPreorder) ;
    // console.log('leftInorder = ', leftInorder) ;
    // console.log('rightInorder = ', rightInorder) ;
    rootNode.left = buildTree(
      left.preorderStart,
      left.preorderEnd,
      left.inorderStart,
      left.inorderEnd
    );
    rootNode.right = buildTree(
      right.preorderStart,
      right.preEnd,
      right.inorderStart,
      right.inorderEnd
    );
    return rootNode;
  }
};

/**
 * 用构建满二叉树的方法构建即可
 * @param {array} levelOrder 二叉树的层序遍历数组
 * @returns {TreeNode} 二叉树根节点
 */
var buildTreeByDefault = function (levelOrder) {
  const nodeList = [] ;
  levelOrder.forEach((value, i) => { //转化成节点列表
    value !== null && nodeList.push(new TreeNode(value)) ;
    value === null && nodeList.push(null) ;
  })
  const root = nodeList[0] ;
  let j = 0 ;
  nodeList.forEach((value, i) => {
    if (value === null) {
      j++ ;
      return ;
    }
    if (nodeList[(i-j)*2+1] !== undefined)
      value.left = nodeList[(i-j)*2+1] ;
    else value.left = null ;
    if (nodeList[(i-j)*2+2] !== undefined)
      value.right = nodeList[(i-j)*2+2] ;
    else value.right = null ;
  })
  return root ;
}

/**
 * 构建树的原理类似buildTreeByDefault，但是树的节点新增了size属性 用于记录以该节点为根的树的节点总数
 * @param {array} levelOrder 二叉树的层序遍历
 * @returns 生成的二叉树根节点
 */
var buildBFT = function (levelOrder) {
  let sumTreeNodes = 0 ;
  // 先生成没有节点属性size的二叉树
  const nodeList = [] ;
  levelOrder.forEach((value, i) => { //转化成节点列表
    value !== null && nodeList.push(new TreeNode(value)) ;
    value === null && nodeList.push(null) ;
  })
  const root = nodeList[0] ;
  let j = 0 ;
  nodeList.forEach((value, i) => {
    if (value === null) {
      j++ ;
      return ;
    }
    if (nodeList[(i-j)*2+1] !== undefined)
      value.left = nodeList[(i-j)*2+1] ;
    else value.left = null ;
    if (nodeList[(i-j)*2+2] !== undefined)
      value.right = nodeList[(i-j)*2+2] ;
    else value.right = null ;
  })
  // 中序遍历二叉树，初始化每个节点的 size
  inTraverse(root) ;
  return root ;
  function inTraverse (root) {
    if (root === null) 
      return ;

    inTraverse(root.left) ;
    root.size = ++sumTreeNodes ;
    // console.log(sumTreeNodes, root.val);
    inTraverse(root.right) ;
  }
  function TreeNode (val, left, right, size) {
    this.val = val === undefined ? 0 : val ;
    this.left = left === undefined ? null : left ;
    this.right = right === undefined ? null : right ;
    this.size = size === undefined ? 0 : size ;
  }
} ;

module.exports = {
  aroot: buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]),
  TreeNode,
  buildTree,
  buildTreeByDefault,
  buildBFT,
}
