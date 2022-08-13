let { buildBFT, buildTreeByDefault } = require('./buildTree')

var result = 0;
var kthSmallest = function(root, k) {
  if (root === null) 
      return ;

  if (k <= root.left.size)
    kthSmallest(root.left, k) ;
  else if (k >= root.right.size)
    kthSmallest(root.right, k - root.size - 1) ;
  else if (k === root.size) {
    result = root.val ;
    return ;
  }
  return ;
};

/**
 * 利用中序遍历的特性 将bst转化为累加树
 * @param {TreeNode} root bst根节点
 * @returns 累加树根节点
 */
var convertBST = function(root) {
  (
    /**
     * 1.分解问题的思想
     * @param {TreeNode} root bst的根节点
     * @param {number} sumRightBigger 比根节点大的二叉树和
     * @returns 累加树的根节点
     */
    function sumTreeNodes (root, sumRightBigger) {
      if (root === null)
        return 0 ;
      
      let right = sumTreeNodes(root.right, sumRightBigger) ;
      // note（细节）：还要加上 sumRightBigger，因为比父节点大的都比子树大
      let left = sumTreeNodes(root.left, right + root.val + sumRightBigger) ;
      let original_root_val = root.val ; 
      // 接受父节点传过来的数据进行累加
      // note（细节）：还要加上 right，因为bft节点的右边的子树节点都比该节点大
      root.val += sumRightBigger + right ;
      // 返回子树和
      return left + right + original_root_val ;
  }(root, 0)) ;

  let sum = 0 ;
  (
    /**
     * 2.遍历的思想 利用了中序遍历的特性
     * @param {TreeNode} root bst的根节点
     * @returns 累加树的根节点
     */
    function inTraverse (root) {
    if (root === null)
      return ;
    inTraverse(root.right) ;
    sum += root.val ;
    root.val = sum ;
    inTraverse(root.left) ;
    return ;
  }(root)) ;
  // [ [ 7 ], [ 9, 4 ], [ 10 ] ]

  // test my code：层序遍历累加树
  // let res = [] ;
  // (function levelTraverse (root, dep) {
  //   if (root === null)
  //     return ;
  //   res[dep] = res[dep] || [] ;
  //   res[dep].push(root.val) ;
  //   levelTraverse(root.left, dep + 1) ;
  //   levelTraverse(root.right, dep + 1) ;
  //   return ;
  // }(root, 0)) ;
  // console.log(res);
  return root ;
};

// kthSmallest(buildBFT([5,3,6,2,4,null,null,1]), 3) ;
convertBST(buildTreeByDefault([3,2,4,1])) ;
// console.log(result);