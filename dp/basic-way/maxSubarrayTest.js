/*
 * @Description: 动态规划：最大子数组
 * @Author: xieql
 * @Date: 2022-10-29 12:19:21
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-01 13:17:58
 * 
 */
/** 53.最大子数组和
 * @param {number[]} nums
 * @return {number}
 */
// 状态转移方程：dp[i] = dp[i-1] + nums[i] or nums[i-1] while dp[i-1] < 0
// 与下面的动态规划方法思路一致 重点是处理状态转移时的手法不同
var maxSubArray = function (nums) {
    let len = nums.length;
    let dp = nums[0];
    let res = dp;
    for (let i = 1; i < len; i++) {
        dp = Math.max(dp, 0); //ingenious：dp[i-1] < 0 时令 dp=0
        dp += nums[i];
        res = Math.max(res, dp);
    }
    return res;
};

// 动态规划法：利用数学归纳法，先假设有 dp[i]，怎么得到 dp[i+1]?
// 状态转移方程：dp[i] = max(nums[i] + dp[i-1], nums[i])
// maxSubArray = function (nums) {
//     let len = nums.length;
//     let dp = new Array(len);
//     // base case
//     dp[0] = nums[0];
//     let res = dp[0];
//     for (let i = 1; i < len; i++) {
//         // 状态转移方程
//         dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
//         res = Math.max(res, dp[i]);
//     }
//     return res;
// }

// 前缀和法：以nums[i]结尾的前缀和减去[0,i]区间中前缀和最小值得到 dp[i]即以nums[i]结尾的最大子数组
// maxSubArray = function (nums) {
//     let len = nums.length;
//     // defined a prefix-sum-aray
//     let preSum = new Array(len + 1);
//     preSum[0] = 0;
//     for (let i = 1; i < preSum.length; i++) {
//         preSum[i] = preSum[i - 1] + nums[i - 1];
//     }
//     // console.log(preSum);
//     let minVal = Number.MAX_SAFE_INTEGER;
//     let res = Number.MIN_SAFE_INTEGER;
//     for (let j = 0; j < len; j++) {
//         // 维护 minVal 是 preSum[0..i] 的最小值
//         minVal = Math.min(minVal, preSum[j]);
//         // 以 nums[i] 结尾的最大子数组和就是 preSum[i+1] - min(preSum[0..i])
//         res = Math.max(res, preSum[j + 1] - minVal);
//     }
//     return res;
// }

let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
let res = maxSubArray(nums);
console.log(res); // 6

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
    return res;
};

// let costs = [[17, 2, 17], [16, 16, 5], [14, 3, 19]]
// let res = minCost(costs)
// console.log(res);