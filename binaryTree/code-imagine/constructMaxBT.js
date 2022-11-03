/*
 * @Description: 
 * @Author: xieql
 * @Date: 2022-08-15 20:28:07
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-03 11:42:39
 * 
 */
let { TreeNode } = require('../buildTree')


var constructMaximumBinaryTree = function (nums) {
    if (nums.length <= 0)
        return null;
    let maxVal = getMax(nums),
        maxIndex = nums.indexOf(maxVal);
    let root = new TreeNode(maxVal);
    let lnums = nums.slice(0, maxIndex), // 频繁使用 slice 会消耗性能
        rnums = nums.slice(maxIndex + 1);
    console.log(lnums, rnums);
    root.left = constructMaximumBinaryTree(lnums);
    root.right = constructMaximumBinaryTree(rnums);
    return root;
    function getMax(nums) {
        let temp = Number.MIN_SAFE_INTEGER;
        nums.forEach(function (value) {
            temp = Math.max(temp, value);
        })
        return temp;
    }
};

// 计算 [l, r] 区间的最大二叉树
var constructMaximumBinaryTree = function (nums) {
    const BuildTree = (arr, left, right) => {
        if (left > right)
            return null;
        // 遍历 [l, r] 找到根节点
        let maxValue = -1;
        let maxIndex = -1;
        for (let i = left; i <= right; ++i) {
            if (arr[i] > maxValue) {
                maxValue = arr[i];
                maxIndex = i;
            }
        }
        let root = new TreeNode(maxValue);
        // 计算根节点的左右最大二叉树
        root.left = BuildTree(arr, left, maxIndex - 1);
        root.right = BuildTree(arr, maxIndex + 1, right);
        return root;
    }
    let root = BuildTree(nums, 0, nums.length - 1);
    return root;
};


let nums = [3, 2, 1, 6, 0, 5];
let rst = constructMaximumBinaryTree(nums);
console.log(rst);