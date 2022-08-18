const buildTree = require('../buildTree');
const { TreeNode, buildBST, buildTreeByDefault } = require('../buildTree') ;

/** 递归遍历中如何记录前后两个节点
 * @param {TreeNode} root bst根节点
 * @return {number} 树中任意两不同节点值之间的最小差值（绝对值）
 */
function getMinimumDifference (root) {
  let minDifference = Number.MAX_SAFE_INTEGER,
    preNode = null ;
  (function intraverse (root) {
    if (root === null) 
      return ;

    intraverse (root.left) ;
    // note：preNode is null while root 是最左边的节点
    if (preNode !== null) {
      var diff = Math.abs(root.val - preNode.val) ;
      minDifference = Math.min(minDifference, diff);
    }
    // 记录前一个节点  
    // note：按中序遍历的顺序记录
    preNode = root ;
    intraverse (root.right) ;
    return ;
  }(root)) ;
  return minDifference ;
}

var getMinimumDifference = function (root) {
  const st = [] ;
  let cur = root, pre = null,
    minDifference = Number.MAX_SAFE_INTEGER ;
  while (cur !== null || st.length > 0) {
    if (cur !== null) { //指针来访问节点，访问到最底层
      st.push(cur) ;
      cur = cur.left ; 
    } else {
      cur = st.pop() ; 
      if (pre !== null) {
        var diff = Math.abs(cur.val - pre.val) ;
        minDifference = Math.min(minDifference, diff);
      }
      pre = cur ; //保存前一个节点
      cur = cur.right ; 
    }
  }
  return minDifference ;
}

// var getMinimumDifference = function (root) {
//   let arr = [];
//   const buildArr = (root) => {
//       if (root) {
//           buildArr(root.left);
//           arr.push(root.val);
//           buildArr(root.right);
//       }
//   }
//   buildArr(root);
//   let diff = arr[arr.length - 1];
//   for (let i = 1; i < arr.length; ++i) {
//       if (diff > arr[i] - arr[i - 1])
//           diff = arr[i] - arr[i - 1];
//   }
//   return diff;
// };

let rst = getMinimumDifference(buildTreeByDefault([1,null,3,2])) ;
console.log(rst);


