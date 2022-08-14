let { buildBST } = require("./buildTree");

var isValidBST = function (root) {
  return (
    /**
     * 问题：对于某一个节点 root，他只能管得了自己的左右子节点，怎么把 root 的约束传递给左右子树呢？
     *      使用辅助函数，增加函数参数列表，在参数中携带额外信息，将这种约束传递给子树的[[所有节点]]
     * @param {TreeNode} root 二叉树的根节点
     * @param {number} min 以root为根节点的二叉树的最小值
     * @param {number} max 以root为根节点的二叉树的最大值
     * @returns {boolean} 二叉树是否为bst
     */
    (function isValidBST(root, min, max) {
      if (root === null) return true;
      if (root.val <= min || root.val >= max) return false;
      return (
        isValidBST(root.left, min, root.val) &&
        isValidBST(root.right, root.val, max)
      );
    })(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
  );
};

var searchBST = function (root, val) {
  let result = null;
  (function searchBST(root, val) {
    if (root === null) return;

    if (root.val < val) searchBST(root.right, val);
    else if (root.val > val) searchBST(root.left, val);
    else if (root.val === val) result = root;
    return;
  })(root, val);
  return result;
};

/**
 * 将节点插进bst 1.遍历bst找到合适位置 2.在合适位置插入指定节点
 * @param {TreeNode} root bst根节点
 * @param {number} val 要插入的结点的值
 * @returns bst根节点
 */
var insertIntoBST = function (root, val) {
  if (root === null) return new TreeNode(val);

  if (root.val < val) root.right = insertIntoBST(root.right, val);
  if (root.val > val) root.left = insertIntoBST(root.left, val);

  return root;
};

/**
 * 删除bst的节点 1.找到要删除的节点 2.分三种情况删除指定节点
 * @param {TreeNode} root bst根节点
 * @param {number} key 要删除的节点的值
 * @returns bst根节点
 */
var deleteNode = function (root, key) {
  if (root === null) return root;

  if (root.val < key) 
    root.right = deleteNode(root.right, key);
  else if (root.val > key) 
    root.left = deleteNode(root.left, key);
  else if (root.val === key) {
    if (root.left === null) return root.right ;
    else if (root.right === null) return root.left ;
    else {
      // 左子树最大节点
      let maxNode = getMax(root.left);
      // console.log(root, maxNode);
      // 删除左子树最大的节点
      root.left = deleteNode(root.left, maxNode.val);
      // console.log(root, maxNode); //这里可以看到 maxNode 被删除了优~~
      // 左子树最大的节点替换掉 root 节点
      maxNode.left = root.left;
      maxNode.right = root.right;
      root = maxNode; 
    }
  }
  return root;
  function getMax(root) {
    let maxNode = null;
    getMax(root);
    return maxNode;
    function getMax(root) {
      if (root.right === null) {
        maxNode = root;
        return;
      }
      getMax(root.right);
      return;
    }
  }
};

// test my code：
let nums = [32, 26, 47, 19, null, null, 56, null, 27];
// console.log(isValidBST(buildBST(nums)));
// nums = [4, 2, 7, 1, 3];
// console.log(searchBST(buildBST(nums), 2));
nums = [5,3,6,2,4,null,7] ;
console.log(deleteNode(buildBST(nums), 3));
