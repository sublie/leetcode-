/** 1.遍历获取子树结构  2.判断子树是否重复
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    const map = new Map(),
        set = new Set() ;
    traverse(root) ;
    function traverse (node) {
        if (node === null)
            return 'null';
        let leftSturct = traverse(node.left) ;
        let rightStruct = traverse(node.right) ;
        let res = leftSturct + ',' + rightStruct + ',' + node.val ;
        if (map.get(res) >= 1) {
            // set.add(node) ;
            map.set(res, map.get(res)+1) ;
        } else {
            map.set(res, 1) ;
        }
        return res;
    }
    let result = [] ;
    map.forEach((value,key) => {
      if (value > 1) {
        // 消去数组 key中的 'null'
        key = key.split(',').filter(item => item !== 'null') ;
        result.push(key.reverse()) ; //reverse()可要可不要
      }
    }) ;
    return result ;
};

// test my code
var root = require('./buildTree').buildTreeByDefault([1,2,3,4,null,2,4,null,null,4]),
  TreeNode = require('./buildTree').TreeNode ;
let res = findDuplicateSubtrees(root) ;
console.log(res); 
  //  [ [ 'null', 'null', '4' ],
  //    [ 'null', 'null', '4', 'null', '2' ] ]