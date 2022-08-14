let { buildBST } = require("./buildTree");

/**
 * 找到两个节点的最近公共父节点 
 *    1.要知道子树是否含有这两个数 
 *    2.返回子树是否含有这两个数
 *    3.后序遍历 返回子树信息
 * @param {TreeNode} root bst根节点
 * @param {number} p 要找到lca的数之一
 * @param {number} q 要找到lca的数之二
 * @returns lca
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === null) return null;
  
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  // base case（simper）：
  // 如果一个节点能够在它的左右子树中分别找到 p 和 q，则该节点为 LCA 节点。
  if (left !== null && right !== null) return root;
  // 遍历过程中找到其中一个立即返回该节点
  if (root.val === p || root.val === q) return root;
  // 如果一个节点能够在他的左右子树中找到 p 或 q 中的一个，则返回找到的节点
  return left !== null ? left : right;
};

let root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],
  p = 5,
  q = 1;
console.log(lowestCommonAncestor(buildBST(root), p, q));
