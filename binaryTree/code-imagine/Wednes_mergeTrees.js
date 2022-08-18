let { TreeNode, buildTreeByDefault } = require('../buildTree')

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
    // if (root1 === null && root2 === null)
    //     return null ;

    // root1.left = mergeTrees(root1.left, root2.left) ;
    // root1.right = mergeTrees(root1.right, root2.right) ;
    // if (root2 === null)
    //     return root1  ;
    // if (root1 === null)
    //     return root2 ;
    // root1.val += root2.val ;
    // return root1 ;
    const preOrder = (root1, root2) => {
        if (!root1)
            return root2
        if (!root2)
            return root1;
        root1.val += root2.val;
        root1.left = preOrder(root1.left, root2.left);
        root1.right = preOrder(root1.right, root2.right);
        return root1;
    }
    return preOrder(root1, root2);
};

let root1 = buildTreeByDefault([1,3,2,5]),
  root2 = buildTreeByDefault([2,1,3,null,4,null,7]) ;
console.log(mergeTrees(root1, root2));