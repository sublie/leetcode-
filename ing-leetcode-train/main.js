/* 
 * @Description: leetcode 每日刷题
 * @Author: xieql
 * @Date: 2022-11-06 18:23:22
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-07 20:53:11
 * 
 */


/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
    // 利用map内数据本身就有序的特性， 把上车地点和上车乘客人数，以及下车地点和下车人数都放进map中， 然后遍历整个map计算实时乘客人数即可。 12 ms;
    let map = [];
    for (let i = 0, it = null; it = trips[i++];) {
        // pick up
        map[it[1]] = map[it[1]] != null ? (it[0] + map[it[1]]) : it[0];
        // drop off
        map[it[2]] = map[it[2]] != null ? (map[it[2]] - it[0]) : -it[0];
    }
    // console.log(map);
    let passengers = 0;
    for (let t of map) {
        if (t == null) continue;
        passengers += t;
        // console.log(typeof passengers, passengers);
        if (passengers > capacity) return false;
    }
    return true;
};

// 区间更新，单点查询：使用差分数组。 注意，真正算数的区间是[from, to - 1]
carPooling = function (trips, capacity) {
    //solution2
    //diff array 
    //1. create arr 
    //2. [0, 0, 0, 0, 0, 0 ....] [2, 1, 5] => []
    let diff = new Array(1000).fill(0);
    for (let trip of trips) {
        let start = trip[1];
        let end = trip[2];
        let value = trip[0];
        diff[start] += value;
        diff[end] -= value;
    }
    //calulate the result arr;
    let res = 0;
    for (let i = 0; i < diff.length; i++) {
        res += diff[i];
        if (res > capacity) return false;
    }
    return true;
}


// let trips =
//     [[2, 1, 5], [3, 3, 7]],
//     capacity =
//         4
// let res = carPooling(trips, capacity);
// console.log(res);

/** "G"、"()" 和/或 "(al)"
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
    let res = [];
    for (let i = 0, it; it = command[i]; i++) {
        if (it === '(')
            if (command[++i] === ")") {
                it = "()";
            }
            else if (command[i] === "a") {
                i += 2;
                it = "(al)";
            }
        console.log(it);
        switch (it) {
            case "G":
                res.push("G");
                break;
            case "()":
                res.push("o");
                break;
            case "/":
                res.push("/");
                break;
            case "(al)":
                res.push("al");
                break;
        }
    }
    return res.join('');
};

// let command = "G()(al)"
// let res = interpret(command);
// console.log(res);
// 输出："Goal"
// 解释：Goal 解析器解释命令的步骤如下所示：
// G -> G
//     () -> o
//         (al) -> al
// 最后连接得到的结果是 "Goal"

// =============================== two days ==================================

/**
 * @param {string} s
 * @return {string[]}
 */
var ambiguousCoordinates = function (s) {
    // 思路：
    // 枚举分隔线，分别计算左右字符串能生成的所有数字，然后从这两个集合中各取一个元素组合成一个坐标（笛卡尔积）。

    //     如何获得一个字符串可以生成的所有合法数字？

    //     首先字符串本身是一个数字，然后同样是枚举分隔位置，加小数点。但是有以下几种特殊情况：

    // 1.如果只有一个数，则不能加小数点，返回它本身。
    // 2.如果字符串第一个数和最后一个数都是 0，则它必不合法。
    // 3.如果字符串第一个数不是 0 但最后一个数是 0，则它不能加小数点，因为会产生多余的 0。
    // 4.如果字符串有前导 0，则它只能以 0. 开头

    // 将 s 中的 "()" 去除
    let len = s.length;
    s = s.substring(1, len - 1);
    console.log(s);
    len -= 2;
    let res = [];
    for (let i = 1; i < len; i++) {
        let l = s.substring(0, i);
        let r = s.substring(i);
        console.log(`l = ${l}, r = ${r}`);
        let left = helpFn(l);
        let right = helpFn(r);
        console.log(typeof left, typeof right);
        console.log(`left = ${left}, right = ${right}`);
        for (let j = 0, x; x = left[j]; j++) {
            for (let k = 0, y; y = right[k]; k++) {
                let p = `(${x}, ${y})`;
                // console.log(p);
                res.push(p);
            }
        }
    }
    return res;
    /**
     * 
     * @param {String} s 
     * @returns 
     */
    function helpFn(s) {
        let res = [];
        if (s.length === 1) {
            res.push(s);
            return res;
        }
        if (s.startsWith("0") && s.endsWith("0")) {
            res.push(null);
            return res;
        }
        if (s.startsWith("0")) {
            res.push(`0.${s.substring(1)}`);
            return res;
        }
        if (s.endsWith("0")) {
            res.push(s);
            return res;
        }
        // 不加小数点
        res.push(s);
        // 加小数点
        for (let i = 1; i < s.length; i++) {
            let a = s.substring(0, i);
            let b = s.substring(i);
            // console.log(res);
            res.push(`${a}.${b}`);
        }
        return res;
    }
};

let s = "(123)"
s = "(0123)"
let res = ambiguousCoordinates(s);
console.log(res);