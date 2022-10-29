/*
 * @Description: 
 * @Author: xieql
 * @Date: 2022-10-26 08:34:40
 * @LastEditors: xieql
 * @LastEditTime: 2022-10-29 12:13:41
 * 
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    // dp 数组全都初始化为特殊值
    let memo = new Array(amount + 1).fill(-99);
    let dp = function (coins, amount) {
        if (amount === 0) return 0;
        if (amount < 0) return - 1;
        // 查备忘录 防止重复计算
        if (memo[amount] != -99) return memo[amount];
        // basic case
        memo[0] = 0;

        let res = Number.MAX_SAFE_INTEGER;
        // 遍历每一层的选择列表
        for (let coin of coins) {
            // 计算子问题的结果
            let index = coins.indexOf(coin);
            // coins.splice(index, 1);
            console.log(coins, coin, index, amount);
            let subProblem = dp(coins, amount - coin);
            // coins = coins.splice(index, 0, coin);
            if (subProblem === -1) continue;
            // 在子问题中选择最优解，然后加一
            res = Math.min(res, subProblem + 1);
        }
        // 记录最优结果
        memo[amount] = res === Number.MAX_SAFE_INTEGER ? -1 : res;
        return memo[amount];
    }
    let res = dp(coins, amount);
    // console.log(memo);
    return res;
};

// coins =
//     [1]
// amount =
//     11

// let res = coinChange(coins, amount);
// console.log(res);

/** 动态规划 O(N ^ 2) 解决力扣第 354 题「 俄罗斯套娃信封问题」
 * @param {number[]} nums
 * @return {number}
 */
// var lengthOfLIS = function (nums) {
//     // 定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
//     let dp = new Array(nums.length);
//     // base case：dp 数组全都初始化为 1
//     dp.fill(1);
//     for (let i = 1; i < dp.length; i++) {
//         let num = nums[i];
//         for (let j = 0; j < i; j++) {
//             if (num > nums[j])
//                 dp[i] = Math.max(dp[i], dp[j] + 1);
//         }
//     }

//     // 取 dp 中的最大值
//     let res = 0;
//     for (let i = 0; i < dp.length; i++) {
//         res = Math.max(res, dp[i]);
//     }
//     // console.log(res, dp);
//     return res;
// };

/** 二分法 O(N * log(N))) 解决力扣第 354 题「 俄罗斯套娃信封问题」
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    let top = [];
    // 牌堆初始化为 0
    let piles = 0;
    for (let i = 0; i < nums.length; i++) {
        // 要处理的牌
        let poker = nums[i];
        console.log(top, poker);
        // 二分搜索 大于等于 poker 中最小的数
        let left = 0, right = piles;
        while (left < right) {
            // note：mid必须向下取整才能令 取到比poker大的数
            let mid = left + Math.floor((right - left) / 2);
            if (poker < top[mid]) {
                right = mid;
            } else if (top[mid] < poker) {
                left = mid + 1;
            } else if (top[mid] === poker) {
                left = mid;
                break;
            }
        }
        // 没找到合适的牌堆，新建一堆
        if (left === piles) piles++;
        // 把这张牌放到牌堆顶
        top[left] = poker;
        console.log(top);
    }
    // 牌堆数就是 LIS 长度
    return piles;
}

// let nums = [10, 9, 2, 5, 3, 7, 101, 18]
// lengthOfLIS(nums)

/** 
 * @param {number[][]} envelopes [[w, h], [w, h]...]
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    // 先对 w 升序排序
    envelopes.sort((a, b) => {
        return a[0] === b[0] ? (b[1] - a[1]) : (a[0] - b[0]);
    });
    console.log(envelopes);
    // 对高度数组寻找 LIS
    let heights = new Array(envelopes.length);
    for (let i = 0; i < envelopes.length; i++) {
        heights[i] = envelopes[i][1];
    }
    return lengthOfLIS(heights);
};

let envelopes = [[5, 4], [6, 4], [6, 7], [2, 3]]
// envelopes = [[30, 50], [12, 2], [3, 4], [12, 15]]
let res = maxEnvelopes(envelopes);
console.log(res);
// 输出：3
// 解释：最多信封的个数为 3, 组合为: [2, 3] => [5, 4] => [6, 7]。