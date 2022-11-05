/*
 * @Description: 
 * @Author: xieql
 * @Date: 2022-10-26 08:34:40
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-04 23:15:53
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
