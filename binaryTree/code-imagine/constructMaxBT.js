let { TreeNode } = require ('../buildTree')


var constructMaximumBinaryTree = function(nums) {
    if (nums.length <= 0)
        return null ;
    let maxVal = getMax(nums),
        maxIndex = nums.indexOf(maxVal) ;
    let root = new TreeNode(maxVal) ;
    let lnums = nums.slice(0,maxIndex),
      rnums = nums.slice(maxIndex + 1) ;
    console.log(lnums, rnums) ;
    root.left = constructMaximumBinaryTree(lnums) ;
    root.right = constructMaximumBinaryTree(rnums) ;
    return root ;
    function getMax (nums) {
      let temp = Number.MIN_SAFE_INTEGER ;
      nums.forEach(function (value) {
        temp = Math.max(temp,value) ;
      })
      return temp ;
    }
};

var constructMaximumBinaryTree = function (nums) {
    const BuildTree = (arr, left, right) => {
        if (left > right)
            return null;
        let maxValue = -1;
        let maxIndex = -1;
        for (let i = left; i <= right; ++i) {
            if (arr[i] > maxValue) {
                maxValue = arr[i];
                maxIndex = i;
            }
        }
        let root = new TreeNode(maxValue);
        root.left = BuildTree(arr, left, maxIndex - 1);
        root.right = BuildTree(arr, maxIndex + 1, right);
        return root;
    }
    let root = BuildTree(nums, 0, nums.length - 1);
    return root;
};

let nums = [3,2,1,6,0,5] ;
let rst = constructMaximumBinaryTree(nums) ;
console.log(rst);