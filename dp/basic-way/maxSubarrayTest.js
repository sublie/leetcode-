/*
 * @Description: 动态规划：最大子数组
 * @Author: xieql
 * @Date: 2022-10-29 12:19:21
 * @LastEditors: xieql
 * @LastEditTime: 2022-10-29 22:36:07
 * 
 */
/** O(N ^ 2)
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // 定义一个数组储 res，res[i]表示 [0,i] 区间连续子数组的最大和与他的左边界
    let res = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        res[i] = new Array(2).fill(0);
    }
    // 思路(错误)：滑动窗口
    // 1. 用一个 for 循环从左到右遍历 nums
    // 2. 对于 [left, right] 先right++直到right==i，再left++right直到left==i 这样就枚举了所有的连续子数组
    //    在不断的调整窗口期间记录 max
    // 难点：记录 max 的 left 即左边界(作用：作为下一个区间[left,i+1]的左边界)
    // 解决：更新 max 时 立即更新 left
    // 难点：穷举所有以[[正数]]开头的子数组，计算他们的元素和，找到元素和最大的那个子数组
    // 。

};

// 53. 最大子数组和
maxSubArray = function (nums) {
    let len = nums.length;
    // defined a prefix-sum-aray
    let preSum = new Array(len + 1);
    preSum[0] = 0;
    for (let i = 1; i < preSum.length; i++) {
        preSum[i] = preSum[i - 1] + nums[i - 1];
    }
    // console.log(preSum);
    let minVal = Number.MAX_SAFE_INTEGER;
    let res = Number.MIN_SAFE_INTEGER;
    for (let j = 0; j < len; j++) {
        // 维护 minVal 是 preSum[0..i] 的最小值
        minVal = Math.min(minVal, preSum[j]);
        // 以 nums[i] 结尾的最大子数组和就是 preSum[i+1] - min(preSum[0..i])
        res = Math.max(res, preSum[j + 1] - minVal);
    }
    return res;
}

// let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// let res = maxSubArray(nums);
// console.log(res);

/** 剑指 Offer II 091. 粉刷房子
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
    // 定义：当第 i 个房子粉刷颜色 j 时，粉刷 [0..i] 这些房子所需的最少花费为 dp[i][j]
    // 其中 j = 0, 1, 2 分别代表三种颜色
    let dp = new Array(costs.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(3);
    }
    // base case
    dp[0] = [...costs[0]];
    // 状态转移 穷举所有 [选择]
    for (let j = 1; j < costs.length; j++) {
        // 颜色 0 只能挨着颜色 1 或颜色 2
        dp[j][0] = Math.min(dp[j - 1][1], dp[j - 1][2]) + costs[j][0];
        // 颜色 1 只能挨着颜色 0 或颜色 2
        dp[j][1] = Math.min(dp[j - 1][0], dp[j - 1][2]) + costs[j][1];
        // 颜色 2 只能挨着颜色 0 或颜色 1
        dp[j][2] = Math.min(dp[j - 1][0], dp[j - 1][1]) + costs[j][2];
        // console.log(dp[j]);
    }
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 3; i++) {
        // console.log(dp[costs.length - 1][i]);
        res = Math.min(res, dp[costs.length - 1][i]);
    }
    return res;
};

let costs = [[17, 2, 17], [16, 16, 5], [14, 3, 19]]
let res = minCost(costs)
console.log(res);