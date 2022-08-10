
// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let res = [] ;
    traverse(root) ;
    function traverse (node) {
        if (node == null) {
            res.push('null') ;
            return ;
        }
        res.push(node.val) ;
        traverse(node.left) ;
        traverse(node.right) ;
        return ;
    }
    return res.join(',') ;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let preOrder = data.split(','), 
        root = new TreeNode(preOrder.shift());
    return (function helpFn (root) {
    
        if (root.val == 'null')
            return null ;
        root.left = helpFn(new TreeNode(preOrder.shift())) ; //构造左子树
        root.right = helpFn(new TreeNode(preOrder.shift())) //构造右子树
        
        return root ;
    })(root)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// test my code 
let aroot = require('./buildTree').aroot,
  data = serialize(aroot) ;

console.log('aroot = ', aroot);
console.log('serialize = ', data);
console.log('deserialize = ', deserialize(data)); 