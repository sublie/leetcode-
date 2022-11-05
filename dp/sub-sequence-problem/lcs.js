/*
 * @Description: 最大公共子序列
 * @Author: xieql
 * @Date: 2022-11-02 16:50:43
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-04 23:18:12
 * 
 */


/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    let m = text1.length, n = text2.length;
    // 备忘录 消除重叠子问题
    let memo = new Array(m);
    for (let i = 0; i < m; i++) {
        memo[i] = new Array(n);
    }
    return dp([...text1], 0, [...text2], 0);
    /**
     * s1中[i, ...] 和 s2中[j, ...] 的最大公共子序列
     * @param {*} s1 
     * @param {*} i 
     * @param {*} s2 
     * @param {*} j 
     */
    // 从上到下 即后序递归
    function dp(s1, i, s2, j) {
        // base case
        if (i >= m || j >= n) return 0;
        // 如果之前计算过，则直接返回备忘录中的答案
        if (memo[i][j] != null) return memo[i][j];
        // 根据 s1[i] 和 s2[j] 的情况做选择
        if (s1[i] === s2[j]) {
            // s1[i] 和 s2[j] 必然在 lcs 中
            memo[i][j] = 1 + dp(s1, i + 1, s2, j + 1);
        }
        else if (s1[i] !== s2[j]) {
            // s1[i] 和 s2[j] 至少有一个不在 lcs 中
            memo[i][j] = Math.max(
                dp(s1, i + 1, s2, j),
                dp(s1, i, s2, j + 1),
                dp(s1, i + 1, s2, j + 1)
            );
        }
        return memo[i][j];
    }
};

// 从底向上 即前序递归
longestCommonSubsequence = function (s1, s2) {
    let m = s1.length, n = s2.length;
    let dp = new Array(m + 1).fill(void 0).map(() => new Array(n + 1).fill(0))
    // 定义：s1[0..i-1] 和 s2[0..j-1] 的 lcs 长度为 dp[i][j]
    // 目标：s1[0..m-1] 和 s2[0..n-1] 的 lcs 长度，即 dp[m][n]
    // note：base case: dp[0][..] = dp[..][0] = 0

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 现在 i 和 j 从 1 开始，所以要减一
            if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
                // s1[i-1] 和 s2[j-1] 必然在 lcs 中
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp[m][n];

    // let dp = new Array(text1.length + 1).fill(void 0).map(() => new Array(text2.length + 1).fill(0))
    // for (let i = 0; i < text1.length; i++) {
    //     for (let j = 0; j < text2.length; j++) {
    //         dp[i + 1][j + 1] = text1.charAt(i) === text2.charAt(j) ? dp[i][j] + 1 : Math.max(dp[i][j + 1], dp[i + 1][j])
    //     }
    // }
    // return dp.pop().pop()
}

// let text1 = "abcde", text2 = "ace"
// // text1 = "a", text2 = "n"
// text1 = "bsbininm", text2 = "jmjkbkjkv"
// let res = longestCommonSubsequence(text1, text2);
// console.log(res);

// ========================================= 上面是最长公共子序列模板 ========================================================

/** 583.两个字符串的删除操作
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    let m = word1.length, n = word2.length;
    let dp = new Array(m + 1).fill(void 0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 现在 i 和 j 从 1 开始，所以要减一
            if (word1[i - 1] === word2[j - 1]) {
                // s1[i-1] 和 s2[j-1] 必然在 lcs 中 note：所以要加上 s1[i-1] 和 s2[j-1] 不在 lcs 中的 lcs
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }
            else if (word1[i - 1] !== word2[j - 1]) {
                // s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i][j - 1]
                );
            }
        }
    }
    console.log(`lcs 的长度为：${dp[m][n]}`);
    return m + n - dp[m][n] * 2;
};

// let word1 = "a", word2 = "b"
// // word1 = "leetcode"
// // word2 = "etco"

// let res = minDistance(word1, word2);
// console.log(res);
// 输出: 2
// 解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"



/** 712. 两个字符串的最小ASCII删除和
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
    let m = s1.length, n = s2.length;
    // 备忘录值为 -1 代表未曾计算
    let memo = new Array(m).fill(void 0).map(() => new Array(n).fill(-1));
    let res = dp(s1, 0, s2, 0);
    return res;
    // 定义：将 s1[i..] 和 s2[j..] 删除成相同字符串，
    // 最小的 ASCII 码之和为 dp(s1, i, s2, j)。
    function dp(s1, i, s2, j) {
        let res = 0;
        // base case
        if (i >= m) {
            // 如果 s1 到头了，那么 s2 剩下的都得删除
            for (; j < n; j++) {
                res += s2[j].charCodeAt();
            }
            return res;
        }
        if (j >= n) {
            // 如果 s2 到头了，那么 s1 剩下的都得删除
            for (; i < m; i++) {
                res += s1[i].charCodeAt();
            }
            return res;
        }
        console.log(`i = ${i}, j = ${j}`);
        if (memo[i][j] !== -1)
            return memo[i][j];
        if (s1[i] === s2[j]) {
            // s1[i] 和 s2[j] 都是在 lcs 中的，不用删除
            memo[i][j] = dp(s1, i + 1, s2, j + 1);
        }
        else if (s1[i] !== s2[j]) {
            // s1[i] 和 s2[j] 至少有一个不在 lcs 中，删一个
            memo[i][j] = Math.min(
                s1[i].charCodeAt() + dp(s1, i + 1, s2, j),
                s2[j].charCodeAt() + dp(s1, i, s2, j + 1)
            );
        }
        return memo[i][j];
    }
    // =============================== my code following ==================================
    // 难点：如何记录 lcs 链路中的各个字符
    // 解决：自顶向下方法above 要想知道字符是否在 lcs 链路中，只有等待得到结果链路才能知道
    // let res = 0;
    // function lcs(s1, s2) {
    //     // 定义一个字典 记录 lcs 链路各字符对应 s1 s2 中的索引
    //     let set1 = new Set();
    //     let set2 = new Set();
    //     let m = s1.length, n = s2.length;
    //     let dp = new Array(m + 1).fill(void 0).map(() => new Array(n + 1).fill(0));
    //     for (let i = 1; i <= m; i++) {
    //         for (let j = 1; j <= n; j++) {
    //             // 由于 i j 从1开始，i-- j--
    //             if (s1[i - 1] === s2[j - 1]) {
    //                 // s1[i] s2[j] 都在 lcs 中
    //                 dp[i][j] = dp[i - 1][j - 1] + 1; //避免了重复计算 已经在 lcs中的字符
    //                 if (!(set1.has(i - 1) || set2.has(j - 1)))
    //                     (res += s1[i - 1].charCodeAt() * 2);
    //                 console.log(s1[i - 1], s2[j - 1]);
    //                 // 记录索引 i j 避免重复计算 res
    //                 set1.add(i - 1) && set2.add(j - 1);
    //             }
    //             else if (s1[i - 1] !== s2[j - 1])
    //                 // s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
    //                 dp[i][j] = Math.max(
    //                     dp[i][j - 1],
    //                     dp[i - 1][j]
    //                 );
    //         }
    //     }
    //     return dp[m][n];
    // }
    // let len = lcs(s1, s2);
    // console.log(`lcs = ${len}`);
    // // 计算 s1 s2 中每个字符的 ASCII 码之和
    // let total = 0;
    // for (let i = 0; i < s1.length; i++) {
    //     total += s1[i].charCodeAt();
    // }
    // for (let j = 0; j < s2.length; j++) {
    //     total += s2[j].charCodeAt();
    // }
    // console.log(`total = ${total}, del = ${res}`);
    // return total - res;
    // ====================================== my code above ======================================
};

let s1 = "sea", s2 = "eat"
// s1 = "delete"
// s2 = "leet"
s1 = "vwojt"
s2 = "saqhgdrarwntji"

let res = minimumDeleteSum(s1, s2);
console.log(res);
// console.log(longestCommonSubsequence(s1, s1));
// 输出: 231
// 解释: 在 "sea" 中删除 "s" 并将 "s" 的值(115)加入总和。
// 在 "eat" 中删除 "t" 并将 116 加入总和。
// 结束时，两个字符串相等，115 + 116 = 231 就是符合条件的最小和。